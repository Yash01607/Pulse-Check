import uuid
from typing import List

from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import dependencies
from app.models.schemas.incident import Incident as IncidentSchema
from app.models.schemas.service import Service as ServiceSchema, CreateServiceRequest, UpdateServiceRequest
from app.services.service_service import create_service, get_service, update_service, delete_service, \
    get_incidents_by_service_id

router = APIRouter()


@router.post("/", response_model=ServiceSchema, dependencies=dependencies, description="Create a new service")
async def create_service_api(
        request: CreateServiceRequest, db: AsyncSession = Depends(get_db)
):
    db_service = await create_service(name=request.name, status=request.status, organization_id=request.organization_id,
                                      db=db)
    return db_service


@router.get("/{service_id}", response_model=ServiceSchema, dependencies=dependencies,
            description="Get a service by its ID")
async def get_service_api(
        service_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_service = await get_service(service_id=service_id, db=db)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service


@router.get("/incidents/{service_id}", response_model=List[IncidentSchema], dependencies=dependencies,
            description="Get Incidents by service ID")
async def get_organization_api(
        service_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_incidents = await get_incidents_by_service_id(service_id=service_id, db=db)
    if db_incidents is None:
        raise HTTPException(status_code=404, detail="Organization not found")
    return db_incidents


@router.put("/{service_id}", response_model=ServiceSchema, dependencies=dependencies,
            description="Update an existing service")
async def update_service_api(
        service_id: uuid.UUID, request: UpdateServiceRequest, db: AsyncSession = Depends(get_db)
):
    db_service = await update_service(
        service_id=service_id, name=request.name, status=request.status, db=db
    )
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service


@router.delete("/{service_id}", response_model=ServiceSchema, dependencies=dependencies,
               description="Delete a service by its ID")
async def delete_service_api(
        service_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_service = await delete_service(service_id=service_id, db=db)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return db_service
