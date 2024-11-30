from typing import Optional

from pydantic import BaseModel

from app.enums import RoleType


class User(BaseModel):
    email: str
    role: Optional[RoleType] = None
    organization_id: Optional[str] = None
