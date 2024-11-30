import uuid

from pydantic import BaseModel

from app.enums import IncidentStatus


class Incident(BaseModel):
    id: uuid.UUID
    title: str
    description: str | None
    status: IncidentStatus
    service_id: uuid.UUID
