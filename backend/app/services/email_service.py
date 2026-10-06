import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings

logger = logging.getLogger("app")


def send_contact_notification(name: str, email: str, subject: str | None, message: str) -> None:
    """Email the site owner about a new contact message. Never raises (runs as a background task)."""
    if not settings.smtp_enabled:
        logger.info("SMTP not configured; skipping notification for message from %s", email)
        return
    try:
        clean_subject = " ".join((subject or "New contact message").split())
        msg = EmailMessage()
        msg["Subject"] = f"[Portfolio] {clean_subject}"
        msg["From"] = settings.SMTP_FROM or settings.SMTP_USER
        msg["To"] = settings.CONTACT_NOTIFY_EMAIL
        msg["Reply-To"] = email
        msg.set_content(f"From: {name} <{email}>\n\n{message}")

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
    except Exception:
        logger.exception("Failed to send contact notification")