# MongoDB connection setup 
from motor.motor_asyncio import AsyncIOMotorClient  # type: ignore
from app.config import settings

client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client[settings.MONGODB_DB]
