from datetime import datetime, timedelta

from jose import jwt
from passlib.hash import argon2

from app.core.config import settings


def verify_password(plain_password, hashed_password):
    return argon2.verify(plain_password, hashed_password)


def hash_password(password):
    return argon2.hash(password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
