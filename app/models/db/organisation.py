from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.models.db import Base


class Organization(Base):
    __tablename__ = "organizations"

    name = Column(String, unique=True, nullable=False)

    users = relationship("User", back_populates="organization")
    services = relationship("Service", back_populates="organization")
