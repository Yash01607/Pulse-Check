from sqlalchemy import Column, String, Enum, ForeignKey, UUID
from sqlalchemy.orm import relationship

from app.enums import ServiceStatus
from app.models.db.base import Base


class Service(Base):
    __tablename__ = "services"

    name = Column(String, nullable=False)
    status = Column(
        Enum(ServiceStatus, name="service_status"),
        default=ServiceStatus.OPERATIONAL,
        nullable=False,
    )
    organization_id = Column(UUID, ForeignKey("organizations.id"), nullable=False)
    manager_id = Column(UUID, ForeignKey("users.id"))

    organization = relationship("Organization", back_populates="services")
    manager = relationship("User", back_populates="managed_services")
    incidents = relationship("Incident", back_populates="service")
