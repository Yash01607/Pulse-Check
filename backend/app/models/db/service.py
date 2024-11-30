import uuid
from typing import List

from sqlalchemy import String, ForeignKey, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.db import Organization, Base


class Service(Base):
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, nullable=False, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(255), nullable=False)
    organization_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(Organization.id), nullable=False)

    # Relationship to Organization
    organization: Mapped["Organization"] = relationship("Organization", back_populates="services")
    # Relationship to Incident (fix here)
    incidents: Mapped[List["Incident"]] = relationship("Incident", back_populates="service")

    __tablename__ = 'service'
