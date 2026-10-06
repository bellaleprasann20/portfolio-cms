import time
from collections import defaultdict, deque

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, Request, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_current_admin, get_db
from app.crud import message as message_crud
from app.schemas.common import Page
from app.schemas.message import MessageAck, MessageCreate, MessageOut, MessageUpdate
from app.services import email_service

router = APIRouter(prefix="/contact", tags=["Contact"])
crud = message_crud.message

# Tiny in-memory rate limiter: N messages per hour per IP (resets on restart, per process).
_WINDOW_SECONDS = 3600
_hits: dict[str, deque] = defaultdict(deque)


def rate_limit(request: Request) -> None:
    ip = request.client.host if request.client else "unknown"
    now = time.monotonic()
    hits = _hits[ip]
    while hits and now - hits[0] > _WINDOW_SECONDS:
        hits.popleft()
    if len(hits) >= settings.CONTACT_RATE_LIMIT:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, "Too many messages. Please try again later.")
    hits.append(now)


# ---------- public ----------
@router.post("", response_model=MessageAck, status_code=status.HTTP_201_CREATED, dependencies=[Depends(rate_limit)])
def submit_message(data: MessageCreate, background: BackgroundTasks, db: Session = Depends(get_db)):
    crud.create(db, data)
    background.add_task(email_service.send_contact_notification, data.name, data.email, data.subject, data.message)
    return MessageAck()


# ---------- admin ----------
@router.get("", response_model=Page[MessageOut], dependencies=[Depends(get_current_admin)])
def list_messages(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    unread_only: bool = False,
    db: Session = Depends(get_db),
):
    return {
        "items": crud.list_filtered(db, skip=skip, limit=limit, unread_only=unread_only),
        "total": crud.count_filtered(db, unread_only=unread_only),
        "skip": skip,
        "limit": limit,
    }


@router.get("/unread-count", dependencies=[Depends(get_current_admin)])
def unread_count(db: Session = Depends(get_db)):
    return {"unread": crud.count_filtered(db, unread_only=True)}


@router.patch("/{message_id}", response_model=MessageOut, dependencies=[Depends(get_current_admin)])
def update_message(message_id: int, data: MessageUpdate, db: Session = Depends(get_db)):
    obj = crud.get(db, message_id)
    if obj is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Message not found")
    return crud.update(db, obj, data)


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_message(message_id: int, db: Session = Depends(get_db)):
    if crud.remove(db, message_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Message not found")