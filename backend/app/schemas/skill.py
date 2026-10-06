from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SkillBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    category: str | None = Field(default=None, max_length=100)
    level: int = Field(default=80, ge=0, le=100)
    icon: str | None = Field(default=None, max_length=500)
    order: int = 0
    is_visible: bool = True


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    category: str | None = Field(default=None, max_length=100)
    level: int | None = Field(default=None, ge=0, le=100)
    icon: str | None = Field(default=None, max_length=500)
    order: int | None = None
    is_visible: bool | None = None


class SkillOut(SkillBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime