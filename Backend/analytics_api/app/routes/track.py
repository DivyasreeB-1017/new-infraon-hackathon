# POST /api/track endpoint 
from fastapi import APIRouter  # type: ignore
from app.models.event import TrackingEvent
from app.services.mixpanel_service import track_event
from app.services.mongo_service import save_event_to_db

router = APIRouter()

@router.post("/")
async def track_generic_event(event: TrackingEvent):
    event_name = f"{event.module.capitalize()} - {event.action}"

    # Save to MongoDB
    await save_event_to_db(event)

    # Track in Mixpanel
    track_event(
        user_id=event.user_id,
        event_name=event_name,
        properties=event.dict()
    )

    return {"status": "success", "stored": True, "tracked": True}
