import uuid
from datetime import timedelta

from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.models.db import User, Organization
from app.models.schemas.organisation import Organisation as OrganisationSchema
from app.models.schemas.user import User as UserSchema, LoginResponse
from app.utils.user import hash_password, verify_password, create_access_token


async def create_user(email: str, password: str, name:str, db: AsyncSession = Depends(get_db)) -> User:
    user_query = select(
        User
    ).where(
        User.email == email
    )
    user_resp = await db.execute(user_query)
    user_found = user_resp.scalar_one_or_none()
    if user_found:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(password)
    new_user = User(email=email, password_hash=hashed_password, name=name)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return UserSchema(email=new_user.email)


async def login_for_access_token(email: str, password: str, db: AsyncSession = Depends(get_db)) -> LoginResponse:
    user_query = select(
        User
    ).where(
        User.email == email
    )
    user_resp = await db.execute(user_query)
    user_found = user_resp.scalar_one_or_none()

    if not user_found or not verify_password(password, user_found.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=120)
    access_token = create_access_token(data={"sub": user_found.email}, expires_delta=access_token_expires)
    return LoginResponse(token=access_token, email=email, name=user_found.name)


async def get_organizations(user_id: uuid.UUID, db: AsyncSession = Depends(get_db)) -> list[
    OrganisationSchema]:
    org_query = select(Organization).where(Organization.user_id == user_id)
    org_resp = await db.execute(org_query)
    org_list = org_resp.scalars().all()
    return [OrganisationSchema(id=org.id, name=org.name, user_id=org.user_id) for org in org_list]
