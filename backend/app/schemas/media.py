from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MediaOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    filename: str
    url: str
    public_id: str | None = None
    content_type: str | None = None
    size: int | None = None
    created_at: datetime
    updated_at: datetime