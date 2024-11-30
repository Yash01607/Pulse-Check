import uuid

from pydantic import BaseModel

from app.enums import ServiceStatus


class Service(BaseModel):
    id: uuid.UUID
    name: str
    status: ServiceStatus = ServiceStatus.OPERATIONAL
    organization_id: uuid.UUID
