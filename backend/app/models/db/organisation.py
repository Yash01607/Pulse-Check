import uuid
from typing import List

from sqlalchemy import String, ForeignKey, UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.models.db import Base, User


class Organization(Base):
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, nullable=False, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey(User.id), nullable=False)

    # Relationship to User
    user: Mapped["User"] = relationship("User", back_populates="organization")

    # Example: Other relationships
    services: Mapped[List["Service"]] = relationship("Service", back_populates="organization")

    __tablename__ = 'organization'
