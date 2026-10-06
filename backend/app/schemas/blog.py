from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BlogBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    excerpt: str | None = Field(default=None, max_length=500)
    content: str = Field(min_length=1)
    cover_image: str | None = Field(default=None, max_length=500)
    tags: list[str] = Field(default_factory=list)
    is_published: bool = False


class BlogCreate(BlogBase):
    slug: str | None = Field(default=None, max_length=255)


class BlogUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    slug: str | None = Field(default=None, max_length=255)
    excerpt: str | None = Field(default=None, max_length=500)
    content: str | None = Field(default=None, min_length=1)
    cover_image: str | None = Field(default=None, max_length=500)
    tags: list[str] | None = None
    is_published: bool | None = None


class BlogOut(BlogBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    published_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class BlogListOut(BaseModel):
    """Lighter version for list pages (no full content)."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    excerpt: str | None = None
    cover_image: str | None = None
    tags: list[str] = []
    is_published: bool
    published_at: datetime | None = None