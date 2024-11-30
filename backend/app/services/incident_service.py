import uuid

from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.enums import IncidentStatus
from app.models.db import Incident, Service
from app.models.schemas.incident import Incident as IncidentSchema


async def create_incident(title: str, description: str | None, status: IncidentStatus, service_id: uuid.UUID,
                          db: AsyncSession = Depends(get_db)) -> IncidentSchema:
    service_query = select(Service).where(Service.id == service_id)
    service_resp = await db.execute(service_query)
    service_found = service_resp.scalar_one_or_none()
    if not service_found:
        raise HTTPException(status_code=400, detail="Provide a valid service ID")
    new_incident = Incident(title=title, description=description, status=status, service_id=service_id)
    db.add(new_incident)
    await db.commit()
    await db.refresh(new_incident)
    return IncidentSchema(id=new_incident.id, title=new_incident.title, description=new_incident.description,
                          status=new_incident.status, service_id=new_incident.service_id)


async def get_incident(incident_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> IncidentSchema:
    incident_query = select(Incident).where(Incident.id == incident_id)
    incident_resp = await db.execute(incident_query)
    incident_found = incident_resp.scalar_one_or_none()
    if not incident_found:
        raise HTTPException(status_code=404, detail="Incident not found")
    return IncidentSchema(id=incident_found.id, title=incident_found.title, description=incident_found.description,
                          status=incident_found.status, service_id=incident_found.service_id)


async def update_incident(incident_id: uuid.UUID, title: str, description: str | None, status: IncidentStatus,
                          db: AsyncSession = Depends(get_db)) -> IncidentSchema:
    incident_query = select(Incident).where(Incident.id == incident_id)
    incident_resp = await db.execute(incident_query)
    incident_found = incident_resp.scalar_one_or_none()
    if not incident_found:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident_found.title = title
    incident_found.description = description
    incident_found.status = status
    await db.merge(incident_found)
    await db.commit()
    await db.refresh(incident_found)
    return IncidentSchema(id=incident_found.id, title=incident_found.title, description=incident_found.description,
                          status=incident_found.status, service_id=incident_found.service_id)


async def delete_incident(incident_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> IncidentSchema:
    incident_query = select(Incident).where(Incident.id == incident_id)
    incident_resp = await db.execute(incident_query)
    incident_found = incident_resp.scalar_one_or_none()
    if not incident_found:
        raise HTTPException(status_code=404, detail="Incident not found")
    await db.delete(incident_found)
    await db.commit()
    return IncidentSchema(id=incident_found.id, title=incident_found.title, description=incident_found.description,
                          status=incident_found.status, service_id=incident_found.service_id)
