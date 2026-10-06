from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TestimonialBase(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    role: str | None = Field(default=None, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    content: str = Field(min_length=1)
    avatar: str | None = Field(default=None, max_length=500)
    rating: int = Field(default=5, ge=1, le=5)
    is_published: bool = True
    order: int = 0


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    role: str | None = Field(default=None, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    content: str | None = Field(default=None, min_length=1)
    avatar: str | None = Field(default=None, max_length=500)
    rating: int | None = Field(default=None, ge=1, le=5)
    is_published: bool | None = None
    order: int | None = None


class TestimonialOut(TestimonialBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime