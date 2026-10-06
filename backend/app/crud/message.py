from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageUpdate


class CRUDMessage(CRUDBase[Message, MessageCreate, MessageUpdate]):
    def list_filtered(
        self, db: Session, *, skip: int = 0, limit: int = 50, unread_only: bool = False,
    ) -> list[Message]:
        return self.get_multi(
            db, skip=skip, limit=limit,
            filters=[Message.is_read.is_(False)] if unread_only else None,
            order_by=[Message.created_at.desc(), Message.id.desc()],
        )

    def count_filtered(self, db: Session, *, unread_only: bool = False) -> int:
        return self.count(db, [Message.is_read.is_(False)] if unread_only else None)


message = CRUDMessage(Message)