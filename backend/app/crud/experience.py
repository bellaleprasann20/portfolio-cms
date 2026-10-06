from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.experience import Experience
from app.schemas.experience import ExperienceCreate, ExperienceUpdate


class CRUDExperience(CRUDBase[Experience, ExperienceCreate, ExperienceUpdate]):
    def list_all(self, db: Session, *, skip: int = 0, limit: int = 100) -> list[Experience]:
        return self.get_multi(
            db, skip=skip, limit=limit,
            order_by=[Experience.order, Experience.start_date.desc()],
        )

    def update(self, db: Session, db_obj: Experience, obj_in: ExperienceUpdate) -> Experience:
        # Validate the merged result, since the Update schema can't see the stored values.
        data = obj_in.model_dump(exclude_unset=True)
        is_current = data.get("is_current", db_obj.is_current)
        start = data.get("start_date", db_obj.start_date)
        end = data.get("end_date", db_obj.end_date)
        extra = {}
        if is_current:
            extra["end_date"] = None
        elif end and end < start:
            raise ValueError("end_date cannot be before start_date")
        return super().update(db, db_obj, obj_in, **extra)


experience = CRUDExperience(Experience)