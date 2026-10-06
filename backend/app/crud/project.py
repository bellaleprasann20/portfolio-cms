from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.utils.slugify import unique_slug


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    @staticmethod
    def _filters(published_only: bool, featured_only: bool) -> list:
        filters = []
        if published_only:
            filters.append(Project.is_published.is_(True))
        if featured_only:
            filters.append(Project.is_featured.is_(True))
        return filters

    def list_filtered(
        self, db: Session, *, skip: int = 0, limit: int = 100,
        published_only: bool = False, featured_only: bool = False,
    ) -> list[Project]:
        return self.get_multi(
            db, skip=skip, limit=limit,
            filters=self._filters(published_only, featured_only),
            order_by=[Project.order, Project.id.desc()],
        )

    def count_filtered(self, db: Session, *, published_only: bool = False, featured_only: bool = False) -> int:
        return self.count(db, self._filters(published_only, featured_only))

    def get_by_slug(self, db: Session, slug: str, *, published_only: bool = False) -> Project | None:
        stmt = select(Project).where(Project.slug == slug)
        if published_only:
            stmt = stmt.where(Project.is_published.is_(True))
        return db.scalar(stmt)

    def create(self, db: Session, obj_in: ProjectCreate) -> Project:
        slug = unique_slug(db, Project, obj_in.slug or obj_in.title)
        return super().create(db, obj_in, slug=slug)

    def update(self, db: Session, db_obj: Project, obj_in: ProjectUpdate) -> Project:
        extra = {}
        if obj_in.slug:  # slug stays stable unless the admin explicitly changes it
            extra["slug"] = unique_slug(db, Project, obj_in.slug, exclude_id=db_obj.id)
        return super().update(db, db_obj, obj_in, **extra)


project = CRUDProject(Project)