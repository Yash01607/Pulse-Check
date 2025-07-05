import uuid
from typing import Optional, List

from pydantic import BaseModel

from app.enums import ServiceStatus
from app.models.schemas.incident import Incident as IncidentSchema


class Service(BaseModel):
    id: uuid.UUID
    name: str
    status: ServiceStatus = ServiceStatus.OPERATIONAL
    organization_id: uuid.UUID
    incidents: Optional[List[IncidentSchema]] = []
