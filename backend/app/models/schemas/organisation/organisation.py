import uuid

from pydantic import BaseModel


class Organisation(BaseModel):
    id: uuid.UUID
    name: str
    user_id: uuid.UUID
