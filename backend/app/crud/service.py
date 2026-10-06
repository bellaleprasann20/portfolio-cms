from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate


class CRUDService(CRUDBase[Service, ServiceCreate, ServiceUpdate]):
    def list_filtered(
        self, db: Session, *, skip: int = 0, limit: int = 100, active_only: bool = False,
    ) -> list[Service]:
        return self.get_multi(
            db, skip=skip, limit=limit,
            filters=[Service.is_active.is_(True)] if active_only else None,
            order_by=[Service.order, Service.id],
        )

    def count_filtered(self, db: Session, *, active_only: bool = False) -> int:
        return self.count(db, [Service.is_active.is_(True)] if active_only else None)


service = CRUDService(Service)