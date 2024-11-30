import uuid

from sqlalchemy import String, ForeignKey, Text, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import Service
from app.models.db.base import Base


class Incident(Base):
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, nullable=False, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(255), nullable=False, default="Open")
    service_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(Service.id), nullable=False)

    service: Mapped["Service"] = relationship("Service", back_populates="incidents")

    __tablename__ = 'incident'
