"""Create the first admin user.

Usage (from the backend/ folder):
    python -m scripts.create_admin
    python -m scripts.create_admin you@example.com "YourPassword"
Reads ADMIN_EMAIL / ADMIN_PASSWORD from .env when no arguments are given.
"""
import sys

import app.models  # noqa: F401  (registers all models)
from app.core.config import settings
from app.crud import user as user_crud
from app.database.base import Base
from app.database.session import SessionLocal, engine


def main() -> None:
    email = sys.argv[1] if len(sys.argv) > 1 else settings.ADMIN_EMAIL
    password = sys.argv[2] if len(sys.argv) > 2 else settings.ADMIN_PASSWORD

    # Safety net for local dev; in production the tables come from Alembic.
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        if user_crud.get_by_email(db, email):
            print(f"Admin {email} already exists.")
            return
        user_crud.create(db, email=email, password=password, full_name="Admin")
        print(f"Admin created: {email}")
    finally:
        db.close()


if __name__ == "__main__":
    main()