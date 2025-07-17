# Pydantic model for tracking 
from pydantic import BaseModel, Field  # type: ignore
from typing import Optional, Dict
from datetime import datetime

class TrackingEvent(BaseModel):
    user_id: str
    module: str
    action: str
    feature: Optional[str] = None
    metadata: Optional[Dict] = {}
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
