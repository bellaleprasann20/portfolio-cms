from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import decode_token
from app.models.user import User
from app.crud import user_crud

bearer_scheme = HTTPBearer(auto_error=False)
strict_bearer_scheme = HTTPBearer(auto_error=True)

def get_optional_admin(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User | None:
    """Return the admin if a valid token is sent, otherwise None (never raises)."""
    if credentials is None:
        return None
    subject = decode_token(credentials.credentials, expected_type="access")
    if subject is None:
        return None
    user = user_crud.get(db, int(subject))
    return user if user and user.is_active else None

def public_only(include_all: bool, admin: User | None) -> bool:
    """True when only published/visible items may be returned.
    Anyone may read published content. `?all=true` (drafts/hidden items) needs an admin token.
    """
    if include_all and admin is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin token required to include unpublished items",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return not include_all

def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(strict_bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Strict dependency that raises 401 if no valid token is provided."""
    subject = decode_token(credentials.credentials, expected_type="access")
    if not subject:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = user_crud.get(db, int(subject))
    if not user or not user.is_active:
        raise HTTPException(status_code=404, detail="Admin user not found")
    return user