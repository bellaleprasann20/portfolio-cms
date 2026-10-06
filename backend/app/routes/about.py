from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db
from app.crud import about as about_crud
from app.schemas.about import AboutOut, AboutUpdate

router = APIRouter(prefix="/about", tags=["About"])


@router.get("", response_model=AboutOut)
def get_about(db: Session = Depends(get_db)):
    obj = about_crud.about.get_single(db)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "About section has not been set up yet")
    return obj


@router.put("", response_model=AboutOut, dependencies=[Depends(get_current_admin)])
def update_about(data: AboutUpdate, db: Session = Depends(get_db)):
    try:
        return about_crud.about.upsert(db, data)
    except ValueError as exc:
        raise HTTPException(422, str(exc))