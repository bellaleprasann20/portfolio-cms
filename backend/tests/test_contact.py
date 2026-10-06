from app.core.config import settings
from app.routes import contact

API = "/api/v1"
VALID = {"name": "Visitor", "email": "v@x.com", "subject": "Hi", "message": "Hello there, nice site!"}


def setup_function():
    contact._hits.clear()  # the rate limiter is process-wide


def test_submit_and_admin_inbox(client, auth):
    assert client.post(f"{API}/contact", json=VALID).status_code == 201

    assert client.get(f"{API}/contact").status_code == 401  # inbox is admin-only
    inbox = client.get(f"{API}/contact", headers=auth).json()
    assert inbox["total"] == 1
    mid = inbox["items"][0]["id"]

    assert client.get(f"{API}/contact/unread-count", headers=auth).json() == {"unread": 1}
    r = client.patch(f"{API}/contact/{mid}", json={"is_read": True}, headers=auth)
    assert r.json()["is_read"] is True
    assert client.get(f"{API}/contact/unread-count", headers=auth).json() == {"unread": 0}
    assert client.get(f"{API}/contact?unread_only=true", headers=auth).json()["total"] == 0

    assert client.delete(f"{API}/contact/{mid}", headers=auth).status_code == 204


def test_validation(client):
    assert client.post(f"{API}/contact", json={**VALID, "message": "short"}).status_code == 422
    assert client.post(f"{API}/contact", json={**VALID, "email": "not-an-email"}).status_code == 422


def test_rate_limit(client):
    limit = settings.CONTACT_RATE_LIMIT
    codes = [client.post(f"{API}/contact", json=VALID).status_code for _ in range(limit + 1)]
    assert codes == [201] * limit + [429]


def test_email_failure_does_not_break_submission(client, monkeypatch):
    def boom(*args, **kwargs):
        raise RuntimeError("smtp down")

    monkeypatch.setattr(settings, "SMTP_HOST", "smtp.invalid")
    monkeypatch.setattr(settings, "SMTP_USER", "u")
    monkeypatch.setattr(settings, "SMTP_PASSWORD", "p")
    monkeypatch.setattr(settings, "CONTACT_NOTIFY_EMAIL", "me@x.com")
    monkeypatch.setattr("smtplib.SMTP", boom)
    assert client.post(f"{API}/contact", json=VALID).status_code == 201