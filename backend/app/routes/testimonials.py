from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db, get_optional_admin, public_only
from app.crud import testimonial as testimonial_crud
from app.models.user import User
from app.schemas.common import Page
from app.schemas.testimonial import TestimonialCreate, TestimonialOut, TestimonialUpdate

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])
crud = testimonial_crud.testimonial


@router.get("", response_model=Page[TestimonialOut])
def list_testimonials(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
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


@router.post("", response_model=TestimonialOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_testimonial(data: TestimonialCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{testimonial_id}", response_model=TestimonialOut, dependencies=[Depends(get_current_admin)])
def update_testimonial(testimonial_id: int, data: TestimonialUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, testimonial_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Testimonial not found")
    return crud.update(db, obj, data)


@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, testimonial_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Testimonial not found")