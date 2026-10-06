from fastapi import APIRouter

from app.routes import (
    about,
    auth,
    blogs,
    contact,
    experience,
    projects,
    services,
    skills,
    stats,
    testimonials,
    upload,
)

api_router = APIRouter()
for module in (auth, about, skills, projects, blogs, experience, testimonials, services, upload, contact, stats):
    api_router.include_router(module.router)