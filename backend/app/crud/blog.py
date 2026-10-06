from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.blog import Blog
from app.schemas.blog import BlogCreate, BlogUpdate
from app.utils.slugify import unique_slug


class CRUDBlog(CRUDBase[Blog, BlogCreate, BlogUpdate]):
    def list_filtered(
        self, db: Session, *, skip: int = 0, limit: int = 100, published_only: bool = False,
    ) -> list[Blog]:
        if published_only:
            return self.get_multi(
                db, skip=skip, limit=limit,
                filters=[Blog.is_published.is_(True)],
                order_by=[Blog.published_at.desc(), Blog.id.desc()],
            )
        return self.get_multi(db, skip=skip, limit=limit, order_by=[Blog.created_at.desc()])

    def count_filtered(self, db: Session, *, published_only: bool = False) -> int:
        return self.count(db, [Blog.is_published.is_(True)] if published_only else None)

    def get_by_slug(self, db: Session, slug: str, *, published_only: bool = False) -> Blog | None:
        stmt = select(Blog).where(Blog.slug == slug)
        if published_only:
            stmt = stmt.where(Blog.is_published.is_(True))
        return db.scalar(stmt)

    def create(self, db: Session, obj_in: BlogCreate) -> Blog:
        slug = unique_slug(db, Blog, obj_in.slug or obj_in.title)
        published_at = datetime.now(timezone.utc) if obj_in.is_published else None
        return super().create(db, obj_in, slug=slug, published_at=published_at)

    def update(self, db: Session, db_obj: Blog, obj_in: BlogUpdate) -> Blog:
        extra = {}
        if obj_in.slug:
            extra["slug"] = unique_slug(db, Blog, obj_in.slug, exclude_id=db_obj.id)
        if obj_in.is_published is True and db_obj.published_at is None:
            extra["published_at"] = datetime.now(timezone.utc)   # first publish
        elif obj_in.is_published is False:
            extra["published_at"] = None                          # unpublished
        return super().update(db, db_obj, obj_in, **extra)


blog = CRUDBlog(Blog)