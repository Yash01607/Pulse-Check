import enum


class RoleType(str, enum.Enum):
    USER = "User"
    ADMIN = "Admin"
