import uuid
from datetime import timedelta

from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, case

from app.core.db import get_db
from app.models.db import User, Organization, Service
from app.models.schemas.organisation import Organisation as OrganisationSchema
from app.models.schemas.user import User as UserSchema, LoginResponse
from app.utils.user import hash_password, verify_password, create_access_token
from app.enums import ServiceStatus


async def create_user(
    email: str,
    password1: str,
    password2: str,
    name: str,
    db: AsyncSession = Depends(get_db),
) -> User:
    if password1 != password2:
        raise HTTPException(
            status_code=400, detail="Password and Confirm Password must match."
        )
    user_query = select(User).where(User.email == email)
    user_resp = await db.execute(user_query)
    user_found = user_resp.scalar_one_or_none()
    if user_found:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(password1)
    new_user = User(email=email, password_hash=hashed_password, name=name)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return UserSchema(email=new_user.email)


async def login_for_access_token(
    email: str, password: str, db: AsyncSession = Depends(get_db)
) -> LoginResponse:
    user_query = select(User).where(User.email == email)
    user_resp = await db.execute(user_query)
    user_found = user_resp.scalar_one_or_none()

    if not user_found or not verify_password(password, user_found.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=120)
    access_token = create_access_token(
        data={"sub": user_found.email}, expires_delta=access_token_expires
    )
    return LoginResponse(
        token=access_token, email=email, name=user_found.name, id=user_found.id
    )


async def get_organizations(
    user_id: uuid.UUID, db: AsyncSession = Depends(get_db)
) -> list[OrganisationSchema]:
    org_query = (
        select(
            Organization,
            func.count(
                case((Service.status == ServiceStatus.OPERATIONAL, 1), else_=None)
            ).label("operational_count"),
            func.count(
                case(
                    (Service.status == ServiceStatus.DEGRADED_PERFORMANCE, 1),
                    else_=None,
                )
            ).label("degraded_count"),
            func.count(
                case((Service.status == ServiceStatus.PARTIAL_OUTAGE, 1), else_=None)
            ).label("partial_outage_count"),
            func.count(
                case((Service.status == ServiceStatus.MAJOR_OUTAGE, 1), else_=None)
            ).label("major_outage_count"),
        )
        .join(Service, Service.organization_id == Organization.id, isouter=True)
        .where(Organization.user_id == user_id)
        .group_by(Organization.id)
    )
    org_resp = await db.execute(org_query)
    org_list = org_resp.fetchall()

    return [
        OrganisationSchema(
            id=org.id,
            name=org.name,
            user_id=org.user_id,
            operational_count=operational_count or 0,
            degraded_count=degraded_count or 0,
            partial_outage_count=partial_outage_count or 0,
            major_outage_count=major_outage_count or 0,
        )
        for org, operational_count, degraded_count, partial_outage_count, major_outage_count in org_list
    ]
