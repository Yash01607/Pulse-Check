from pydantic import BaseModel


class UpdateOrganisationRequest(BaseModel):
    name: str
