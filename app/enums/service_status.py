import enum


class ServiceStatus(str, enum.Enum):
    OPERATIONAL = "Operational"
    DEGRADED_PERFORMANCE = "Degraded Performance"
    PARTIAL_OUTAGE = "Partial Outage"
    MAJOR_OUTAGE = "Major Outage"
