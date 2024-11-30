import uuid
from typing import List

from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.enums import ServiceStatus
from app.models.db import Service, Organization, Incident
from app.models.schemas.incident import Incident as IncidentSchema
from app.models.schemas.service import Service as ServiceSchema


async def create_service(name: str, status: ServiceStatus, organization_id: uuid.UUID,
                         db: AsyncSession = Depends(get_db)) -> ServiceSchema:
    org_query = select(Organization).where(Organization.id == organization_id)
    org_resp = await db.execute(org_query)
    org_found = org_resp.scalar_one_or_none()
    if not org_found:
        raise HTTPException(status_code=400, detail="Provide a valid organization ID")
    new_service = Service(name=name, status=status, organization_id=organization_id)
    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    return ServiceSchema(id=new_service.id, name=new_service.name, status=new_service.status,
                         organization_id=new_service.organization_id)


async def get_service(service_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> ServiceSchema:
    service_query = select(Service).where(Service.id == service_id)
    service_resp = await db.execute(service_query)
    service_found = service_resp.scalar_one_or_none()
    if not service_found:
        raise HTTPException(status_code=404, detail="Service not found")
    return ServiceSchema(id=service_found.id, name=service_found.name, status=service_found.status,
                         organization_id=service_found.organization_id)


async def get_incidents_by_service_id(service_id: uuid.UUID,
                                      db: AsyncSession = Depends(get_db)) -> List[IncidentSchema]:
    incidents_query = select(Incident).where(Incident.service_id == service_id)
    incidents_resp = await db.execute(incidents_query)
    incidents_list = incidents_resp.scalars().all()
    return [IncidentSchema(id=i.id, title=i.title, description=i.description, service_id=i.service_id, status=i.status)
            for i in incidents_list]


async def update_service(service_id: uuid.UUID, name: str, status: ServiceStatus,
                         db: AsyncSession = Depends(get_db)) -> ServiceSchema:
    service_query = select(Service).where(Service.id == service_id)
    service_resp = await db.execute(service_query)
    service_found = service_resp.scalar_one_or_none()
    if not service_found:
        raise HTTPException(status_code=404, detail="Service not found")
    service_found.name = name
    service_found.status = status
    await db.merge(service_found)
    await db.commit()
    await db.refresh(service_found)
    return ServiceSchema(id=service_found.id, name=service_found.name, status=service_found.status,
                         organization_id=service_found.organization_id)


async def delete_service(service_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> ServiceSchema:
    service_query = select(Service).where(Service.id == service_id)
    service_resp = await db.execute(service_query)
    service_found = service_resp.scalar_one_or_none()
    if not service_found:
        raise HTTPException(status_code=404, detail="Service not found")
    await db.delete(service_found)
    await db.commit()
    return ServiceSchema(id=service_found.id, name=service_found.name, status=service_found.status,
                         organization_id=service_found.organization_id)
