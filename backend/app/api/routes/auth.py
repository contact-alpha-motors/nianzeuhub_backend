from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.core import security
from app.core.config import settings
from app.db.database import get_db
from app.db.models import User, Profile
from app.schemas import UserCreate, UserResponse, Token
from app.api.deps import get_current_user

router = APIRouter()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == user_in.email).first()
        if user:
            raise HTTPException(
                status_code=400,
                detail="The user with this email already exists in the system.",
            )
        user = User(
            email=user_in.email,
            hashed_password=security.get_password_hash(user_in.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Create empty profile
        profile = Profile(
            id=user.id,
            name=user_in.email.split("@")[0] # Default name
        )
        db.add(profile)
        db.commit()
        
        return user
    except HTTPException:
        raise
    except Exception as e:
        print(f"[AUTH/REGISTER ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {e}")

@router.post("/login", response_model=Token)
def login_form(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    """Login with form data (for Swagger UI / OAuth2 flow)."""
    try:
        user = db.query(User).filter(User.email == form_data.username).first()
        if not user or not security.verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        elif not user.is_active:
            raise HTTPException(status_code=400, detail="Inactive user")
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = security.create_access_token(
            subject=user.email, expires_delta=access_token_expires
        )
        return {
            "access_token": access_token,
            "token_type": "bearer",
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[AUTH/LOGIN_FORM ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {e}")

@router.post("/login/json", response_model=Token)
def login_json(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Login with JSON body (for Bruno / frontend)."""
    try:
        user = db.query(User).filter(User.email == login_data.email).first()
        if not user or not security.verify_password(login_data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        elif not user.is_active:
            raise HTTPException(status_code=400, detail="Inactive user")
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = security.create_access_token(
            subject=user.email, expires_delta=access_token_expires
        )
        return {
            "access_token": access_token,
            "token_type": "bearer",
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[AUTH/LOGIN_JSON ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {e}")

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    try:
        return current_user
    except Exception as e:
        print(f"[AUTH/ME ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=f"Get current user failed: {e}")
