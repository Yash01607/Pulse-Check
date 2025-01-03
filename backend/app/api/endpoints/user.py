import uuid
from typing import List

from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import dependencies
from app.models.schemas.organisation import Organisation as OrganisationSchema
from app.services.user_service import get_organizations

router = APIRouter()


@router.get("/{user_id}/organisations", response_model=List[OrganisationSchema], dependencies=dependencies,
             description="Get Organisations for a User")
async def get_user_organisations(user_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> List[OrganisationSchema]:
    try:
        organisations = await get_organizations(user_id=user_id, db=db)
        return organisations
    except Exception as e:
        print(f"Error in creating User: {e}")
        raise HTTPException(status_code=400, detail=f"Error in creating User: {str(e)}")
