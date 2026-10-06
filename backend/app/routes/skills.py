from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db, get_optional_admin, public_only
from app.crud import skill as skill_crud
from app.models.user import User
from app.schemas.common import Page
from app.schemas.skill import SkillCreate, SkillOut, SkillUpdate

router = APIRouter(prefix="/skills", tags=["Skills"])
crud = skill_crud.skill


@router.get("", response_model=Page[SkillOut])
def list_skills(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    category: str | None = None,
    include_all: bool = Query(False, alias="all"),
    db: Session = Depends(get_db),
    admin: User | None = Depends(get_optional_admin),
):
    visible_only = public_only(include_all, admin)
    return {
        "items": crud.list_filtered(db, skip=skip, limit=limit, category=category, visible_only=visible_only),
        "total": crud.count_filtered(db, category=category, visible_only=visible_only),
        "skip": skip,
        "limit": limit,
    }


@router.get("/categories", response_model=list[str])
def list_categories(
    include_all: bool = Query(False, alias="all"),
    db: Session = Depends(get_db),
    admin: User | None = Depends(get_optional_admin),
):
    return crud.categories(db, visible_only=public_only(include_all, admin))


@router.post("", response_model=SkillOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_skill(data: SkillCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{skill_id}", response_model=SkillOut, dependencies=[Depends(get_current_admin)])
def update_skill(skill_id: int, data: SkillUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, skill_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Skill not found")
    return crud.update(db, obj, data)


@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, skill_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Skill not found")