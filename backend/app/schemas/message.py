from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class MessageCreate(BaseModel):
    """Public contact form payload."""

    name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    subject: str | None = Field(default=None, max_length=255)
    message: str = Field(min_length=10, max_length=5000)


class MessageUpdate(BaseModel):
    """Admin can only mark a message read/unread."""

    is_read: bool


class MessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    subject: str | None = None
    message: str
    is_read: bool
    created_at: datetime
    updated_at: datetime


class MessageAck(BaseModel):
    """What the public contact endpoint returns (no internal data)."""

    detail: str = "Message sent successfully"