# Configuration settings 
import os
from dotenv import load_dotenv  # type: ignore

load_dotenv()

class Settings:
    MONGODB_URI = os.getenv("MONGODB_URI")
    MONGODB_DB = os.getenv("MONGODB_DB")
    MIXPANEL_TOKEN = os.getenv("MIXPANEL_TOKEN")

settings = Settings()
