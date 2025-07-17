# FastAPI Analytics API 
from fastapi import FastAPI # type: ignore
from app.routes import track

app = FastAPI(
    title="Analytics Tracker API",
    version="1.0.0"
)

app.include_router(track.router, prefix="/api/track", tags=["Tracking"])
