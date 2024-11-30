import uuid

from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import dependencies
from app.models.schemas.incident import Incident as IncidentSchema, CreateIncidentRequest, UpdateIncidentRequest
from app.services.incident_service import create_incident, get_incident, update_incident, delete_incident

router = APIRouter()


@router.post("/", response_model=IncidentSchema, dependencies=dependencies, description="Create a new incident")
async def create_incident_api(
        request: CreateIncidentRequest, db: AsyncSession = Depends(get_db)
):
    db_incident = await create_incident(
        title=request.title, description=request.description, status=request.status, service_id=request.service_id,
        db=db
    )
    return db_incident


@router.get("/{incident_id}", response_model=IncidentSchema, dependencies=dependencies,
            description="Get an incident by its ID")
async def get_incident_api(
        incident_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_incident = await get_incident(incident_id=incident_id, db=db)
    if db_incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return db_incident


@router.put("/{incident_id}", response_model=IncidentSchema, dependencies=dependencies,
            description="Update an existing incident")
async def update_incident_api(
        incident_id: uuid.UUID, request: UpdateIncidentRequest, db: AsyncSession = Depends(get_db)
):
    db_incident = await update_incident(
        incident_id=incident_id, title=request.title, description=request.description, status=request.status, db=db
    )
    if db_incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return db_incident


@router.delete("/{incident_id}", response_model=IncidentSchema, dependencies=dependencies,
               description="Delete an incident by its ID")
async def delete_incident_api(
        incident_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    db_incident = await delete_incident(incident_id=incident_id, db=db)
    if db_incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return db_incident
