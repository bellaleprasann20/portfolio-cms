from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.about import About
from app.schemas.about import AboutCreate, AboutUpdate


class CRUDAbout(CRUDBase[About, AboutCreate, AboutUpdate]):
    def get_single(self, db: Session) -> About | None:
        return db.scalar(select(About).order_by(About.id).limit(1))

    def upsert(self, db: Session, obj_in: AboutUpdate) -> About:
        existing = self.get_single(db)
        if existing:
            return self.update(db, existing, obj_in)
        if not obj_in.full_name:
            raise ValueError("full_name is required to create the About record")
        return self.create(db, AboutCreate(**obj_in.model_dump(exclude_unset=True)))


about = CRUDAbout(About)