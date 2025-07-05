import uuid
from typing import List

from pydantic import BaseModel

from app.models.schemas.service import Service as ServiceSchema


class OrganisationResponse(BaseModel):
    id: uuid.UUID
    name: str
    user_id: uuid.UUID
    services: List[ServiceSchema]

