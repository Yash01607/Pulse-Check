import uuid

from pydantic import BaseModel

from app.enums import ServiceStatus


class CreateServiceRequest(BaseModel):
    name: str
    status: ServiceStatus = ServiceStatus.OPERATIONAL
    organization_id: uuid.UUID
