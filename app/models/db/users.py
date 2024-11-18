from sqlalchemy import Column, String, Enum, UUID, ForeignKey
from sqlalchemy.orm import relationship

from app.enums import RoleType
from app.models.db.base import Base


class User(Base):
    __tablename__ = "users"

    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(RoleType, name="role_type"),
                  default=RoleType.USER,
                  nullable=False)
    organization_id = Column(UUID, ForeignKey("organizations.id"), nullable=False)

    organization = relationship("Organization", back_populates="users")
    managed_services = relationship("Service", back_populates="manager")
