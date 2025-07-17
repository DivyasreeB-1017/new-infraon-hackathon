# MongoDB insert logic 
from app.db import db
from app.models.event import TrackingEvent

async def save_event_to_db(event: TrackingEvent):
    event_dict = event.dict()
    await db.analytics_tracking.insert_one(event_dict)
