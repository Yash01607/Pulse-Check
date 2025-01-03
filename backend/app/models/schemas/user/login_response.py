from typing import Optional

from pydantic import BaseModel


class LoginResponse(BaseModel):
    email: str
    token: str
    name: Optional[str] = ""
