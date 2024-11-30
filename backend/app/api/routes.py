from fastapi import APIRouter

from app.api.endpoints import auth, organisation, user, service, incident

api_router = APIRouter()

api_router.include_router(auth.router, prefix="", tags=["Authentication"])
api_router.include_router(organisation.router, prefix="/organization", tags=["Organizations"])
api_router.include_router(user.router, prefix="/user", tags=["Users"])
api_router.include_router(service.router, prefix="/service", tags=["Services"])
api_router.include_router(incident.router, prefix="/incident", tags=["Incidents"])
