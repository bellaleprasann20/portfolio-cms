from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import create_access_token, create_refresh_token
from app.crud import user_crud
from app.database.session import get_db

# Assuming you have a Token schema, otherwise returning a dict works perfectly for FastAPI
# from app.schemas.user import Token 

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login")
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    Note: OAuth2PasswordRequestForm uses 'username' for the email field.
    """
    # Using your clean authenticate method from user_crud
    user = user_crud.authenticate(db, email=form_data.username, password=form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Using your excellent token creation methods from security.py
    return {
        "access_token": create_access_token(str(user.id)),
        "refresh_token": create_refresh_token(str(user.id)),
        "token_type": "bearer"
    }