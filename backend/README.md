# Portfolio CMS: Backend (FastAPI + PostgreSQL)

REST API for the portfolio site and its admin panel.
Interactive docs: http://localhost:8000/docs

## Setup
```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env              # then set DATABASE_URL and a long random SECRET_KEY
```

## Database
Create an empty PostgreSQL database, then:
```bash
alembic revision --autogenerate -m "initial schema"   # first time only; commit the generated file
alembic upgrade head
python -m scripts.create_admin                         # uses ADMIN_EMAIL / ADMIN_PASSWORD from .env
```
After changing a model: `alembic revision --autogenerate -m "describe change"` then `alembic upgrade head`.

## Run
```bash
uvicorn app.main:app --reload
```

## Test
```bash
pytest          # uses a throwaway SQLite file, never your real database
```

## Deploy (Render / Railway)
- Start command: the one in `Procfile`
- Run `alembic upgrade head` as the pre-deploy / release command
- Set the same variables as `.env.example`
- Set `CLOUDINARY_*`: local `uploads/` is wiped on every redeploy
- Set `CORS_ORIGINS` to your deployed frontend + admin URLs
- Set `PUBLIC_BASE_URL` to the API's public URL