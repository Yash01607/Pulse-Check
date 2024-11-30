import uuid

from pydantic import BaseModel


class CreateOrganisationRequest(BaseModel):
    name: str
    user_id: uuid.UUID
