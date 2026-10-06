from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_current_admin, get_db
from app.crud import media as media_crud
from app.schemas.common import Page
from app.schemas.media import MediaOut
from app.services import storage_service

router = APIRouter(prefix="/upload", tags=["Upload"], dependencies=[Depends(get_current_admin)])
crud = media_crud.media


def _sniff_image_type(content: bytes) -> str | None:
    """Detect the real image type from the file's magic bytes (never trust the client's header)."""
    if content.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if content.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return "image/webp"
    if content[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    return None


@router.post("/image", response_model=MediaOut, status_code=status.HTTP_201_CREATED)
def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    max_bytes = settings.MAX_UPLOAD_MB * 1024 * 1024
    content = file.file.read(max_bytes + 1)
    if len(content) > max_bytes:
        raise HTTPException(413, f"File too large (max {settings.MAX_UPLOAD_MB} MB)")

    content_type = _sniff_image_type(content)
    if content_type is None:
        raise HTTPException(415, "Only JPEG, PNG, WebP and GIF images are allowed")

    stored = storage_service.save_image(content, content_type)
    return crud.create_record(
        db,
        filename=(file.filename or stored.filename)[:255],
        url=stored.url,
        public_id=stored.public_id,
        content_type=content_type,
        size=len(content),
    )


@router.get("", response_model=Page[MediaOut])
def list_media(skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=100), db: Session = Depends(get_db)):
    return {"items": crud.list_recent(db, skip=skip, limit=limit), "total": crud.count(db), "skip": skip, "limit": limit}


@router.delete("/{media_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_media(media_id: int, db: Session = Depends(get_db)):
    obj = crud.get(db, media_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Media not found")
    storage_service.delete_image(obj.url, obj.public_id)
    crud.remove(db, media_id)