import enum


class RoleType(str, enum.Enum):
    USER = "User"
    MANAGER = "Manager"
    ADMIN = "Admin"
