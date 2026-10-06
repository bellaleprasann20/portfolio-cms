from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.media import Media


class CRUDMedia(CRUDBase[Media, BaseModel, BaseModel]):
    def create_record(
        self, db: Session, *, filename: str, url: str,
        public_id: str | None = None, content_type: str | None = None, size: int | None = None,
    ) -> Media:
        db_obj = Media(
            filename=filename, url=url, public_id=public_id,
            content_type=content_type, size=size,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def list_recent(self, db: Session, *, skip: int = 0, limit: int = 50) -> list[Media]:
        return self.get_multi(db, skip=skip, limit=limit, order_by=[Media.created_at.desc()])


media = CRUDMedia(Media)