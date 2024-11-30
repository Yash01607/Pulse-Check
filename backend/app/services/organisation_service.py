import uuid
from typing import List

from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.models.db import User, Organization, Service
from app.models.schemas.organisation import Organisation as OrganisationSchema
from app.models.schemas.service import Service as ServiceSchema


async def create_organisation(name: str, user_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> OrganisationSchema:
    user_query = select(User).where(User.id == user_id)
    user_resp = await db.execute(user_query)
    user_found = user_resp.scalar_one_or_none()
    if not user_found:
        raise HTTPException(status_code=400, detail="Provide a valid user ID")
    new_org = Organization(name=name, user_id=str(user_id))
    db.add(new_org)
    await db.commit()
    await db.refresh(new_org)
    return OrganisationSchema(id=new_org.id, name=new_org.name, user_id=new_org.user_id)


async def get_organization(organization_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> OrganisationSchema:
    org_query = select(Organization).where(Organization.id == organization_id)
    org_resp = await db.execute(org_query)
    org_found = org_resp.scalar_one_or_none()
    if not org_found:
        raise HTTPException(status_code=404, detail="Organization not found")
    return OrganisationSchema(id=org_found.id, name=org_found.name, user_id=org_found.user_id)


async def get_services_by_organization_id(organization_id: uuid.UUID,
                                          db: AsyncSession = Depends(get_db)) -> List[ServiceSchema]:
    services_query = select(Service).where(Service.organization_id == organization_id)
    services_resp = await db.execute(services_query)
    services_list = services_resp.scalars().all()
    return [ServiceSchema(id=s.id, name=s.name, organization_id=s.organization_id, status=s.status) for s in
            services_list]


async def update_organization(organization_id: uuid.UUID, name: str,
                              db: AsyncSession = Depends(get_db)) -> OrganisationSchema:
    org_query = select(Organization).where(Organization.id == organization_id)
    org_resp = await db.execute(org_query)
    org_found = org_resp.scalar_one_or_none()
    if not org_found:
        raise HTTPException(status_code=404, detail="Organization not found")
    org_found.name = name
    await db.merge(org_found)
    await db.commit()
    await db.refresh(org_found)
    return OrganisationSchema(id=org_found.id, name=org_found.name, user_id=org_found.user_id)


async def delete_organization(organization_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> OrganisationSchema:
    org_query = select(Organization).where(Organization.id == organization_id)
    org_resp = await db.execute(org_query)
    org_found = org_resp.scalar_one_or_none()
    if not org_found:
        raise HTTPException(status_code=404, detail="Organization not found")
    await db.delete(org_found)
    await db.commit()
    return OrganisationSchema(id=org_found.id, name=org_found.name, user_id=org_found.user_id)
