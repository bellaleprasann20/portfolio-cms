from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db, get_optional_admin, public_only
from app.crud import project as project_crud
from app.models.user import User
from app.schemas.common import Page
from app.schemas.project import ProjectCreate, ProjectOut, ProjectUpdate

router = APIRouter(prefix="/projects", tags=["Projects"])
crud = project_crud.project


@router.get("", response_model=Page[ProjectOut])
def list_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    featured: bool = False,
    include_all: bool = Query(False, alias="all"),
    db: Session = Depends(get_db),
    admin: User | None = Depends(get_optional_admin),
):
    published_only = public_only(include_all, admin)
    return {
        "items": crud.list_filtered(db, skip=skip, limit=limit, published_only=published_only, featured_only=featured),
        "total": crud.count_filtered(db, published_only=published_only, featured_only=featured),
        "skip": skip,
        "limit": limit,
    }


@router.get("/id/{project_id}", response_model=ProjectOut, dependencies=[Depends(get_current_admin)])
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    obj = crud.get(db, project_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")
    return obj


@router.get("/{slug}", response_model=ProjectOut)
def get_project(slug: str, db: Session = Depends(get_db), admin: User | None = Depends(get_optional_admin)):
    obj = crud.get_by_slug(db, slug, published_only=admin is None)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")
    return obj


@router.post("", response_model=ProjectOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{project_id}", response_model=ProjectOut, dependencies=[Depends(get_current_admin)])
def update_project(project_id: int, data: ProjectUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, project_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")
    return crud.update(db, obj, data)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, project_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project not found")