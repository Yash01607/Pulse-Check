from fastapi import APIRouter

from app.api.endpoints import auth, organisation, user, service, incident


def prepend_to_path(path: str):
    return f"/api{path}"


api_router = APIRouter()

api_router.include_router(auth.router, prefix=prepend_to_path(""), tags=["Authentication"])
api_router.include_router(organisation.router, prefix=prepend_to_path("/organisation"), tags=["Organisations"])
api_router.include_router(user.router, prefix=prepend_to_path("/user"), tags=["Users"])
api_router.include_router(service.router, prefix=prepend_to_path("/service"), tags=["Services"])
api_router.include_router(incident.router, prefix=prepend_to_path("/incident"), tags=["Incidents"])
