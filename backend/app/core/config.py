from pathlib import Path
from typing import Any, Optional
from urllib.parse import quote_plus

from dotenv import load_dotenv
from pydantic import (
    PostgresDsn, field_validator
)
from pydantic_core.core_schema import ValidationInfo
from pydantic_settings import BaseSettings

project_path: Path = Path(__file__).parent.parent.parent
env_file_path = project_path / '.env'
load_dotenv(env_file_path)


class Settings(BaseSettings):
    PROJECT_NAME: str

    PATH_TO_TEMP: str = "./tmp"

    POSTGRES_DB_HOST: str = "localhost"
    POSTGRES_DB_USERNAME: str
    POSTGRES_DB_PASSWORD: str
    POSTGRES_DB_NAME: str
    POSTGRES_DB_PORT: int = 5432
    MAX_POSTGRES_CONNECTIONS: Optional[int] = 10

    SQLALCHEMY_DATABASE_URI: Optional[str] = None

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    def get_postgres_sqlalchemy_uri(cls, v: Optional[str], values: ValidationInfo) -> Any:
        if isinstance(v, str):
            return v
        password = values.data.get("POSTGRES_DB_PASSWORD")
        return str(PostgresDsn.build(
            scheme="postgresql+asyncpg",
            host=values.data.get("POSTGRES_DB_HOST"),
            username=values.data.get("POSTGRES_DB_USERNAME"),
            password=quote_plus(password) if password else '',
            path=f"{values.data.get('POSTGRES_DB_NAME') or ''}",
            port=values.data.get("POSTGRES_DB_PORT"),
        ))


settings = Settings()
