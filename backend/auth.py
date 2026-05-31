import os
import random
import string
from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .schemas import UserRegister, UserLogin, Token, UserResponse

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "CA_JS_SUPER_SECRET_PASTEL_KEY_987654321")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 1 day

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def generate_unique_user_id(db: Session) -> str:
    """Generates an instant unique alphanumeric User ID like CAJS4829"""
    while True:
        suffix = "".join(random.choices(string.ascii_uppercase + string.digits, k=4))
        user_id = f"CAJS{suffix}"
        # Check uniqueness
        exists = db.query(User).filter(User.user_id == user_id).first()
        if not exists:
            return user_id

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.post("/register", response_model=UserResponse)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # Verify passwords match
    if user_data.password != user_data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
        
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Generate unique user ID and hash password
    user_id = generate_unique_user_id(db)
    hashed_pwd = get_password_hash(user_data.password)

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        password_hash=hashed_pwd,
        user_id=user_id,
        exam_level=user_data.exam_level,
        points=100,  # Starting welcome bonus points
        streak=1,
        accuracy_pct=85.0
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    # Support username or email lookup
    user = db.query(User).filter(
        (User.email == login_data.username_or_email) | (User.user_id == login_data.username_or_email)
    ).first()

    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email/User-ID or password")

    # Increment login streak as reward
    user.streak += 1
    user.points += 10  # 10 points daily streak reward!
    db.commit()
    db.refresh(user)

    # Generate access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwt.encode(
        {"sub": user.email, "exp": datetime.utcnow() + access_token_expires},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }
