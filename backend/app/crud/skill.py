from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillUpdate


class CRUDSkill(CRUDBase[Skill, SkillCreate, SkillUpdate]):
    @staticmethod
    def _filters(category: str | None, visible_only: bool) -> list:
        filters = []
        if category:
            filters.append(Skill.category == category)
        if visible_only:
            filters.append(Skill.is_visible.is_(True))
        return filters

    def list_filtered(
        self, db: Session, *, skip: int = 0, limit: int = 100,
        category: str | None = None, visible_only: bool = False,
    ) -> list[Skill]:
        return self.get_multi(
            db, skip=skip, limit=limit,
            filters=self._filters(category, visible_only),
            order_by=[Skill.order, Skill.id],
        )

    def count_filtered(self, db: Session, *, category: str | None = None, visible_only: bool = False) -> int:
        return self.count(db, self._filters(category, visible_only))

    def categories(self, db: Session, *, visible_only: bool = False) -> list[str]:
        stmt = select(Skill.category).where(Skill.category.is_not(None))
        if visible_only:
            stmt = stmt.where(Skill.is_visible.is_(True))
        return list(db.scalars(stmt.distinct().order_by(Skill.category)))


skill = CRUDSkill(Skill)