from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db, get_optional_admin, public_only
from app.crud import blog as blog_crud
from app.models.user import User
from app.schemas.blog import BlogCreate, BlogListOut, BlogOut, BlogUpdate
from app.schemas.common import Page

router = APIRouter(prefix="/blogs", tags=["Blogs"])

# FIX: blog_crud is already the initialized instance of CRUDBlog
crud = blog_crud


@router.get("", response_model=Page[BlogListOut])
def list_blogs(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    include_all: bool = Query(False, alias="all"),
    db: Session = Depends(get_db),
    admin: User | None = Depends(get_optional_admin),
):
    published_only = public_only(include_all, admin)
    return {
        "items": crud.list_filtered(db, skip=skip, limit=limit, published_only=published_only),
        "total": crud.count_filtered(db, published_only=published_only),
        "skip": skip,
        "limit": limit,
    }


@router.get("/id/{blog_id}", response_model=BlogOut, dependencies=[Depends(get_current_admin)])
def get_blog_by_id(blog_id: int, db: Session = Depends(get_db)):
    obj = crud.get(db, blog_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Blog post not found")
    return obj


@router.get("/{slug}", response_model=BlogOut)
def get_blog(slug: str, db: Session = Depends(get_db), admin: User | None = Depends(get_optional_admin)):
    obj = crud.get_by_slug(db, slug, published_only=admin is None)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Blog post not found")
    return obj


@router.post("", response_model=BlogOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_blog(data: BlogCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{blog_id}", response_model=BlogOut, dependencies=[Depends(get_current_admin)])
def update_blog(blog_id: int, data: BlogUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, blog_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Blog post not found")
    return crud.update(db, obj, data)


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, blog_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Blog post not found")