"""Seed the CMS with content from the resume.

Usage (from backend/):
    python -m scripts.seed_data
"""
from datetime import date

import app.models  # noqa: F401  (registers all models)
from app.database.base import Base
from app.database.session import SessionLocal, engine
from app.models.about import About
from app.models.experience import Experience
from app.models.project import Project
from app.models.service import Service
from app.models.skill import Skill

ABOUT = dict(
    full_name="Prasann Bellale",
    headline="Full Stack Developer (MERN) | Learning Python & AI",
    bio=(
        "Full Stack MERN Developer (Fresher) with hands-on training building "
        "production-style full-stack applications using React, Node.js, Express, and "
        "MongoDB. Experienced with REST API design, JWT authentication, real-time features "
        "with Socket.io, and cloud deployment on Vercel and Render. Currently expanding "
        "into Python, FastAPI, and applied AI/LLM development."
    ),
    email="prasannbellale20@gmail.com",
    location="Bhalki, Karnataka",
    github_url="https://github.com/bellaleprasann20",
    linkedin_url="https://www.linkedin.com/in/prasann-bellale",
)

# (name, category, level, order). Levels are placeholders: edit them in the admin panel.
SKILLS = [
    # Languages
    ("JavaScript (ES6+)", "Languages", 85),
    ("Python", "Languages", 55),
    ("HTML5", "Languages", 90),
    ("CSS3", "Languages", 85),
    # Frontend
    ("React", "Frontend", 85),
    ("Redux", "Frontend", 70),
    ("Tailwind CSS", "Frontend", 85),
    ("Vite", "Frontend", 80),
    # Backend
    ("Node.js", "Backend", 80),
    ("Express.js", "Backend", 80),
    ("REST API Design", "Backend", 80),
    ("JWT Authentication", "Backend", 80),
    ("FastAPI", "Backend", 50),
    # Database
    ("MongoDB", "Database", 80),
    ("Mongoose", "Database", 80),
    ("SQL", "Database", 50),
    # AI / ML
    ("Prompt Engineering", "AI / ML", 60),
    ("LLM APIs (OpenAI, Gemini)", "AI / ML", 55),
    ("RAG & Vector DBs (ChromaDB)", "AI / ML", 45),
    ("LangChain / LangGraph", "AI / ML", 40),
    # Tools & Integrations
    ("Socket.io", "Tools", 75),
    ("Stripe & Razorpay", "Tools", 75),
    ("Cloudinary", "Tools", 75),
    ("Nodemailer", "Tools", 75),
    ("Git & GitHub", "Tools", 85),
    ("Vercel & Render", "Tools", 80),
    ("Postman", "Tools", 80),
]

PROJECTS = [
    dict(
        title="Real-Time Chat Application",
        slug="real-time-chat-application",
        short_description="Real-time messaging with online status, typing indicators and file sharing.",
        description=(
            "A real-time messaging platform built with Socket.io, featuring online-status "
            "indicators, typing indicators, and file sharing. Authentication uses JWT + bcrypt "
            "with HTTP-only cookies. Deployed on Vercel/Render with lazy loading and code splitting."
        ),
        tech_stack=["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "bcrypt"],
        github_url="https://github.com/bellaleprasann20",
        is_featured=True,
    ),
    dict(
        title="JobPortal: Job Search & Application Platform",
        slug="jobportal",
        short_description="Role-based job platform for job seekers, employers and admins.",
        description=(
            "A role-based access control system for Job Seekers, Employers, and Admins with "
            "resume upload/parsing. Includes a MongoDB aggregation-based job-matching algorithm "
            "and automated email notifications via Nodemailer."
        ),
        tech_stack=["React", "Node.js", "Express", "MongoDB", "JWT", "Multer", "Nodemailer", "Chart.js"],
        github_url="https://github.com/bellaleprasann20",
        is_featured=True,
    ),
    dict(
        title="Food Hub: Food Delivery Platform",
        slug="food-hub",
        short_description="Multi-restaurant ordering platform with Stripe payments and admin analytics.",
        description=(
            "A multi-restaurant ordering platform with cart management, order tracking and "
            "Stripe payment integration. Uses Cloudinary for optimized image delivery across a "
            "500+ item menu catalogue, with an admin dashboard for order analytics."
        ),
        tech_stack=["React", "Node.js", "Express", "MongoDB", "Stripe", "Cloudinary", "JWT"],
        github_url="https://github.com/bellaleprasann20",
        is_featured=True,
    ),
    dict(
        title="Atharv Preschool: School Management Platform",
        slug="atharv-preschool",
        short_description="Full-stack school management with Razorpay fee collection and PDF receipts.",
        description=(
            "A full-stack school management platform with Razorpay integration for fee "
            "collection and admission processing. Implements JWT auth, automated PDF receipts "
            "via PDFKit and email notifications. Deployed on Vercel/Render with MongoDB Atlas."
        ),
        tech_stack=["React", "Node.js", "Express", "MongoDB", "Razorpay", "PDFKit", "Nodemailer", "Tailwind CSS", "Vite"],
        live_url="https://atharv-preschool.vercel.app",
        is_featured=True,
    ),
]

EXPERIENCE = [
    dict(
        company="ApnaCollege (Online)",
        position="MERN Stack Development Program: Trainee",
        start_date=date(2025, 9, 1),
        end_date=date(2026, 3, 31),
        is_current=False,
        description=(
            "Completed structured, project-based training covering React, Node.js, Express.js, "
            "MongoDB, REST APIs, JWT authentication and cloud deployment. Designed and built "
            "four full-stack applications applying WebSocket messaging, payment integration, "
            "RBAC, and automated email/PDF workflows."
        ),
    ),
]

SERVICES = [
    ("Full Stack Web Development", "End-to-end MERN applications: React frontends, Node/Express APIs, MongoDB."),
    ("REST API Development", "Secure, well-structured APIs with JWT auth, validation and documentation."),
    ("Payment & Email Integration", "Stripe/Razorpay payments, Nodemailer workflows and PDF receipts."),
    ("Deployment & Hosting", "Deploying apps to Vercel, Render and MongoDB Atlas."),
]


def seed() -> None:
    Base.metadata.create_all(bind=engine)  # local safety net; production uses Alembic
    db = SessionLocal()
    try:
        if db.query(About).count() == 0:
            db.add(About(**ABOUT))
        if db.query(Skill).count() == 0:
            db.add_all(
                Skill(name=n, category=c, level=l, order=i) for i, (n, c, l) in enumerate(SKILLS)
            )
        if db.query(Project).count() == 0:
            db.add_all(Project(order=i, **p) for i, p in enumerate(PROJECTS))
        if db.query(Experience).count() == 0:
            db.add_all(Experience(order=i, **e) for i, e in enumerate(EXPERIENCE))
        if db.query(Service).count() == 0:
            db.add_all(Service(title=t, description=d, order=i) for i, (t, d) in enumerate(SERVICES))
        db.commit()
        print("Seed complete.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()