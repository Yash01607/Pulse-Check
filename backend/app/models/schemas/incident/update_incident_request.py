from pydantic import BaseModel

from app.enums import IncidentStatus


class UpdateIncidentRequest(BaseModel):
    title: str
    description: str | None
    status: IncidentStatus
