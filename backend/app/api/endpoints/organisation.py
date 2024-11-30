import uuid
from typing import List

from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import dependencies
from app.models.schemas.organisation import Organisation as OrganisationSchema, CreateOrganisationRequest, \
    UpdateOrganisationRequest
from app.models.schemas.service import Service as ServiceSchema
from app.services.organisation_service import create_organisation, get_organization, update_organization, \
    delete_organization, get_services_by_organization_id

router = APIRouter()


@router.post("/", response_model=OrganisationSchema, dependencies=dependencies, description="Create a new organization")
async def create_organization_api(
        request: CreateOrganisationRequest, db: AsyncSession = Depends(get_db)
):
    db_organization = await create_organisation(name=request.name, user_id=request.user_id, db=db)
    return db_organization


@router.get("/services/{organization_id}", response_model=List[ServiceSchema], dependencies=dependencies,
            description="Get Incidents by organization ID")
async def get_organization_api(
        organization_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_incidents = await get_services_by_organization_id(organization_id=organization_id, db=db)
    if db_incidents is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_incidents


@router.get("/{organization_id}", response_model=OrganisationSchema, dependencies=dependencies,
            description="Get an organization by its ID")
async def get_organization_api(
        organization_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_organization = await get_organization(organization_id=organization_id, db=db)
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_organization


@router.put("/{organization_id}", response_model=OrganisationSchema, dependencies=dependencies,
            description="Update an existing organization")
async def update_organization_api(
        organization_id: uuid.UUID, request: UpdateOrganisationRequest, db: AsyncSession = Depends(get_db)
):
    db_organization = await update_organization(
        organization_id=organization_id, name=request.name, db=db
    )
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_organization


@router.delete("/{organization_id}", response_model=OrganisationSchema, dependencies=dependencies,
               description="Delete an organization by its ID")
async def delete_organization_api(
        organization_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_organization = await delete_organization(organization_id=organization_id, db=db)
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_organization
