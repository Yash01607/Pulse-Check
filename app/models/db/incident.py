from sqlalchemy import Column, String, Enum, ForeignKey, Text, UUID, DateTime
from sqlalchemy.orm import relationship

from app.enums import IncidentStatus
from app.models.db.base import Base


class Incident(Base):
    __tablename__ = "incidents"

    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(
        Enum(IncidentStatus, name="incident_status"),
        default=IncidentStatus.OPEN,
        nullable=False,
    )
    service_id = Column(UUID, ForeignKey("services.id"), nullable=False)
    created_by = Column(UUID, ForeignKey("users.id"), nullable=False)
    resolved_by = Column(UUID, ForeignKey("users.id"), nullable=True)

    resolved_at = Column(DateTime, nullable=True )

    service = relationship("Service", back_populates="incidents")
    creator = relationship("User", foreign_keys=[created_by])
    resolver = relationship("User", foreign_keys=[resolved_by])
