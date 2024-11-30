from datetime import datetime

from fastapi import Depends, HTTPException, status, Request
from jose import jwt, JWTError

from app.core.config import settings


class AuthorizationCheck:
    async def __call__(self, request: Request):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                raise credentials_exception

            token_prefix = "Bearer "
            if not auth_header.startswith(token_prefix):
                raise credentials_exception

            token = auth_header[len(token_prefix):]
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            if "exp" in payload:
                expire = datetime.utcfromtimestamp(payload["exp"])
                if expire < datetime.utcnow():
                    raise credentials_exception
            username = payload.get("sub")
            if not username:
                raise credentials_exception
            return username
        except JWTError as e:
            raise credentials_exception


authorisation = AuthorizationCheck()

dependencies = [Depends(authorisation)]
