import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import api_router

app = FastAPI(title="Pulse Check", description="Pulse Check API", version="0.1.0")

app.include_router(api_router)

# Sets all CORS enabled origins
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"],
    allow_headers=["*"], )


if __name__ == "__main__":
    uvicorn.run(app)