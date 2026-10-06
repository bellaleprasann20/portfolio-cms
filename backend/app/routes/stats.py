from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_db
from app.crud import blog, experience, media, message, project, service, skill, testimonial
from app.schemas.message import MessageOut

router = APIRouter(prefix="/stats", tags=["Stats"], dependencies=[Depends(get_current_admin)])


class StatsOut(BaseModel):
    projects: int
    skills: int
    blogs: int
    published_blogs: int
    experience: int
    testimonials: int
    services: int
    media: int
    messages: int
    unread_messages: int
    recent_messages: list[MessageOut]


@router.get("", response_model=StatsOut)
def get_stats(db: Session = Depends(get_db)):
    return {
        "projects": project.project.count(db),
        "skills": skill.skill.count(db),
        "blogs": blog.blog.count(db),
        "published_blogs": blog.blog.count_filtered(db, published_only=True),
        "experience": experience.experience.count(db),
        "testimonials": testimonial.testimonial.count(db),
        "services": service.service.count(db),
        "media": media.media.count(db),
        "messages": message.message.count(db),
        "unread_messages": message.message.count_filtered(db, unread_only=True),
        "recent_messages": message.message.list_filtered(db, limit=5),
    }