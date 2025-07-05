import uuid
from typing import Optional
from pydantic import BaseModel


class Organisation(BaseModel):
    id: uuid.UUID
    name: str
    user_id: uuid.UUID
    operational_count: Optional[int] = 0
    degraded_count: Optional[int] = 0
    partial_outage_count: Optional[int] = 0
    major_outage_count: Optional[int] = 0
