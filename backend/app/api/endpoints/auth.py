from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.models.schemas.user import User as UserSchema, LoginResponse, CreateUserRequest, LoginRequest
from app.services import user_service

router = APIRouter()


@router.post("/signup", response_model=UserSchema, description="Create User")
async def signup(request: CreateUserRequest, db: AsyncSession = Depends(get_db)) -> UserSchema:
    try:
        user = await user_service.create_user(email=request.email, password=request.password, name=request.name, db=db)
        return user
    except Exception as e:
        print(f"Error in creating User: {(e)}")
        raise HTTPException(status_code=400, detail=f"Error in creating User: {str(e)}")


@router.post("/login", response_model=LoginResponse, description="Create User")
async def login_for_access_token(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    try:
        login_res = await user_service.login_for_access_token(email=request.email, password=request.password, db=db)
        return login_res
    except Exception as e:
        print(f"Error in Logging in User: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error in Logging in User: {str(e)}")
