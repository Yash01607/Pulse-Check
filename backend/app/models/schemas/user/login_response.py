import uuid
from typing import Optional

from pydantic import BaseModel


class LoginResponse(BaseModel):
    email: str
    token: str
    id: uuid.UUID
    name: Optional[str] = ""
