import uuid
from typing import List

from pydantic import BaseModel

from app.models.schemas.service import Service as ServiceSchema


class ServiceResponse(BaseModel):
    id: uuid.UUID
    name: str
    org_id: uuid.UUID
    services: List[ServiceSchema]
