import uuid

from pydantic import BaseModel
from sqlalchemy import String, DateTime, UUID, func
from sqlalchemy.orm import DeclarativeBase, declared_attr, Mapped, mapped_column


def is_pydantic(obj: object):
    """Checks whether an object is pydantic."""
    return type(obj).__class__.__name__ == "ModelMetaclass"


class Base(DeclarativeBase):
    @declared_attr
    def __tablename__(cls):
        return f"{cls.__name__.lower()}"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda _: str(uuid.uuid4()))
    created_by: Mapped[str] = mapped_column(String(255), nullable=True)
    updated_by: Mapped[str] = mapped_column(String(255), nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True,
                                                 default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), nullable=True,
                                                 onupdate=func.now(),
                                                 default=func.now())

    @classmethod
    def from_dto(cls, dto: BaseModel):
        obj = cls()
        properties = dict(dto)
        for key, value in properties.items():
            try:
                if is_pydantic(value):
                    value = getattr(cls, key).property.mapper.class_.from_dto(value)
                setattr(obj, key, value)
            except AttributeError as e:
                raise AttributeError(e)
        return obj
