# Mixpanel integration service 
from mixpanel import Mixpanel  # type: ignore
from app.config import settings

mp = Mixpanel(settings.MIXPANEL_TOKEN)

def track_event(user_id: str, event_name: str, properties: dict):
    try:
        mp.track(user_id, event_name, properties)
    except Exception as e:
        print(f"Mixpanel error: {e}")
