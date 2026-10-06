from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db, get_optional_admin, public_only
from app.crud import service as service_crud
from app.models.user import User
from app.schemas.common import Page
from app.schemas.service import ServiceCreate, ServiceOut, ServiceUpdate

router = APIRouter(prefix="/services", tags=["Services"])
crud = service_crud.service


@router.get("", response_model=Page[ServiceOut])
def list_services(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    include_all: bool = Query(False, alias="all"),
    db: Session = Depends(get_db),
    admin: User | None = Depends(get_optional_admin),
):
    active_only = public_only(include_all, admin)
    return {
        "items": crud.list_filtered(db, skip=skip, limit=limit, active_only=active_only),
        "total": crud.count_filtered(db, active_only=active_only),
        "skip": skip,
        "limit": limit,
    }


@router.post("", response_model=ServiceOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_service(data: ServiceCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{service_id}", response_model=ServiceOut, dependencies=[Depends(get_current_admin)])
def update_service(service_id: int, data: ServiceUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, service_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Service not found")
    return crud.update(db, obj, data)


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_service(service_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, service_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Service not found")