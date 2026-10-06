from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate


class CRUDTestimonial(CRUDBase[Testimonial, TestimonialCreate, TestimonialUpdate]):
    def list_filtered(
        self, db: Session, *, skip: int = 0, limit: int = 100, published_only: bool = False,
    ) -> list[Testimonial]:
        return self.get_multi(
            db, skip=skip, limit=limit,
            filters=[Testimonial.is_published.is_(True)] if published_only else None,
            order_by=[Testimonial.order, Testimonial.id.desc()],
        )

    def count_filtered(self, db: Session, *, published_only: bool = False) -> int:
        return self.count(db, [Testimonial.is_published.is_(True)] if published_only else None)


testimonial = CRUDTestimonial(Testimonial)