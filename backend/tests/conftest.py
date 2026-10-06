import os

# Must be set before the app is imported: env vars override .env, so tests never touch your real DB.
os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["SECRET_KEY"] = "test-secret-key-that-is-at-least-32-bytes-long"

import struct
import zlib

import pytest
from fastapi.testclient import TestClient

import app.models  # noqa: F401,E402  (registers all models)
from app.crud import user as user_crud  # noqa: E402
from app.database.base import Base  # noqa: E402
from app.database.session import SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    user_crud.create(db, "admin@test.com", "secret123", "Admin")
    db.close()
    with TestClient(app) as c:
        yield c


@pytest.fixture()
def auth(client):
    """Authorization header for the seeded admin."""
    r = client.post("/api/v1/auth/login", json={"email": "admin@test.com", "password": "secret123"})
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


@pytest.fixture()
def png_bytes() -> bytes:
    """A valid 1x1 PNG."""
    def chunk(tag: bytes, data: bytes) -> bytes:
        body = struct.pack(">I", len(data)) + tag + data
        return body + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(b"\x00\xff\x00\x00"))
        + chunk(b"IEND", b"")
    )