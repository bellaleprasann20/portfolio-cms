from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db
from app.crud import experience as experience_crud
from app.schemas.common import Page
from app.schemas.experience import ExperienceCreate, ExperienceOut, ExperienceUpdate

router = APIRouter(prefix="/experience", tags=["Experience"])
crud = experience_crud.experience


@router.get("", response_model=Page[ExperienceOut])
def list_experience(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return {
        "items": crud.list_all(db, skip=skip, limit=limit),
        "total": crud.count(db),
        "skip": skip,
        "limit": limit,
    }


@router.post("", response_model=ExperienceOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_experience(data: ExperienceCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{experience_id}", response_model=ExperienceOut, dependencies=[Depends(get_current_admin)])
def update_experience(experience_id: int, data: ExperienceUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, experience_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Experience not found")
    try:
        return crud.update(db, obj, data)
    except ValueError as exc:
        raise HTTPException(422, str(exc))


@router.delete("/{experience_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_experience(experience_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, experience_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Experience not found")