import uuid

from pydantic import BaseModel

from app.enums import ServiceStatus


class UpdateServiceRequest(BaseModel):
    name: str
    status: ServiceStatus = ServiceStatus.OPERATIONAL
