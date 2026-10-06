from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AboutBase(BaseModel):
    full_name: str = Field(min_length=1, max_length=255)
    headline: str | None = Field(default=None, max_length=255)
    bio: str | None = None
    profile_image: str | None = Field(default=None, max_length=500)
    resume_url: str | None = Field(default=None, max_length=500)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    location: str | None = Field(default=None, max_length=255)
    github_url: str | None = Field(default=None, max_length=500)
    linkedin_url: str | None = Field(default=None, max_length=500)
    twitter_url: str | None = Field(default=None, max_length=500)
    years_experience: int | None = Field(default=None, ge=0, le=60)


class AboutCreate(AboutBase):
    pass


class AboutUpdate(BaseModel):
    full_name: str | None = Field(default=None, min_length=1, max_length=255)
    headline: str | None = Field(default=None, max_length=255)
    bio: str | None = None
    profile_image: str | None = Field(default=None, max_length=500)
    resume_url: str | None = Field(default=None, max_length=500)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    location: str | None = Field(default=None, max_length=255)
    github_url: str | None = Field(default=None, max_length=500)
    linkedin_url: str | None = Field(default=None, max_length=500)
    twitter_url: str | None = Field(default=None, max_length=500)
    years_experience: int | None = Field(default=None, ge=0, le=60)


class AboutOut(AboutBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime