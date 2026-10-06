import io
import logging
import uuid
from dataclasses import dataclass
from pathlib import Path

from app.core.config import settings

logger = logging.getLogger("app")

EXTENSIONS = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}


@dataclass
class StoredFile:
    url: str
    public_id: str
    filename: str


def _local_root() -> Path:
    return Path(settings.UPLOAD_DIR).resolve()


def _is_local_url(url: str) -> bool:
    return url.startswith(f"{settings.PUBLIC_BASE_URL.rstrip('/')}/uploads/")


def save_image(content: bytes, content_type: str) -> StoredFile:
    name = f"{uuid.uuid4().hex}{EXTENSIONS[content_type]}"
    if settings.cloudinary_enabled:
        return _save_cloudinary(content, name)
    return _save_local(content, name)


def delete_image(url: str, public_id: str | None) -> None:
    """Best-effort delete of the stored file. The DB record is removed by the caller."""
    try:
        if _is_local_url(url):
            if not public_id:
                return
            target = (_local_root() / public_id).resolve()
            if _local_root() in target.parents and target.is_file():  # block path traversal
                target.unlink()
        elif settings.cloudinary_enabled and public_id:
            import cloudinary.uploader

            _configure_cloudinary()
            cloudinary.uploader.destroy(public_id)
    except Exception:
        logger.exception("Could not delete stored file %s", public_id)


def _save_local(content: bytes, name: str) -> StoredFile:
    folder = _local_root() / "images"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / name).write_bytes(content)
    return StoredFile(
        url=f"{settings.PUBLIC_BASE_URL.rstrip('/')}/uploads/images/{name}",
        public_id=f"images/{name}",
        filename=name,
    )


def _configure_cloudinary() -> None:
    import cloudinary

    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )


def _save_cloudinary(content: bytes, name: str) -> StoredFile:
    import cloudinary.uploader

    _configure_cloudinary()
    result = cloudinary.uploader.upload(
        io.BytesIO(content), folder="portfolio", public_id=Path(name).stem, resource_type="image"
    )
    return StoredFile(url=result["secure_url"], public_id=result["public_id"], filename=name)