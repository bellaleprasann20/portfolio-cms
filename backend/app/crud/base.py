from typing import Any, Generic, Sequence, TypeVar

from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database.base import Base

ModelT = TypeVar("ModelT", bound=Base)
CreateT = TypeVar("CreateT", bound=BaseModel)
UpdateT = TypeVar("UpdateT", bound=BaseModel)


class CRUDBase(Generic[ModelT, CreateT, UpdateT]):
    """Generic CRUD operations. Subclass it to add model-specific queries."""

    def __init__(self, model: type[ModelT]):
        self.model = model

    def get(self, db: Session, id: int) -> ModelT | None:
        return db.get(self.model, id)

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
        filters: Sequence[Any] | None = None,
        order_by: Sequence[Any] | None = None,
    ) -> list[ModelT]:
        stmt = select(self.model)
        if filters:
            stmt = stmt.where(*filters)
        stmt = stmt.order_by(*(order_by or [self.model.id]))
        return list(db.scalars(stmt.offset(skip).limit(limit)))

    def count(self, db: Session, filters: Sequence[Any] | None = None) -> int:
        stmt = select(func.count()).select_from(self.model)
        if filters:
            stmt = stmt.where(*filters)
        return db.scalar(stmt) or 0

    def create(self, db: Session, obj_in: CreateT, **extra: Any) -> ModelT:
        """`extra` overrides/adds fields (e.g. a generated slug)."""
        data = obj_in.model_dump()
        data.update(extra)
        db_obj = self.model(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, db_obj: ModelT, obj_in: UpdateT, **extra: Any) -> ModelT:
        """Apply only the fields the client actually sent (partial update)."""
        data = obj_in.model_dump(exclude_unset=True)
        data.update(extra)
        columns = self.model.__table__.columns
        for field, value in data.items():
            # Ignore explicit nulls for NOT NULL columns instead of crashing at commit.
            if value is None and field in columns and not columns[field].nullable:
                continue
            setattr(db_obj, field, value)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, id: int) -> ModelT | None:
        db_obj = db.get(self.model, id)
        if db_obj is not None:
            db.delete(db_obj)
            db.commit()
        return db_obj