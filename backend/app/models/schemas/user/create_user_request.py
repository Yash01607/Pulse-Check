from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    email: str
    password1: str
    password2: str
    name: str
