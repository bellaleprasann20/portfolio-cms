from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProjectBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    short_description: str | None = Field(default=None, max_length=500)
    description: str | None = None
    thumbnail: str | None = Field(default=None, max_length=500)
    images: list[str] = Field(default_factory=list)
    tech_stack: list[str] = Field(default_factory=list)
    github_url: str | None = Field(default=None, max_length=500)
    live_url: str | None = Field(default=None, max_length=500)
    is_featured: bool = False
    is_published: bool = True
    order: int = 0


class ProjectCreate(ProjectBase):
    # Optional: if omitted, the route generates it from the title.
    slug: str | None = Field(default=None, max_length=255)


class ProjectUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    slug: str | None = Field(default=None, max_length=255)
    short_description: str | None = Field(default=None, max_length=500)
    description: str | None = None
    thumbnail: str | None = Field(default=None, max_length=500)
    images: list[str] | None = None
    tech_stack: list[str] | None = None
    github_url: str | None = Field(default=None, max_length=500)
    live_url: str | None = Field(default=None, max_length=500)
    is_featured: bool | None = None
    is_published: bool | None = None
    order: int | None = None


class ProjectOut(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    created_at: datetime
    updated_at: datetime