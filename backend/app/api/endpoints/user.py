import uuid
from typing import List

from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import dependencies
from app.models.schemas.organisation import Organisation as OrganisationSchema
from app.services.user_service import get_organizations

router = APIRouter()


@router.get("/organisations/{user_id}", response_model=List[OrganisationSchema], dependencies=dependencies,
             description="Get Organisations for a User")
async def create_user(user_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> List[OrganisationSchema]:
    try:
        user = await get_organizations(user_id=user_id, db=db)
        return user
    except Exception as e:
        print(f"Error in creating User: {e}")
        raise HTTPException(status_code=400, detail=f"Error in creating User: {str(e)}")
