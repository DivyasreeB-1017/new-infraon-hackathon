from fastapi import FastAPI, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId  # type: ignore
from fastapi.middleware.cors import CORSMiddleware
import os

# FastAPI app initialization
app = FastAPI(
    title="Simple Menu Config API",
    description="Fetch data from menu_config collection based on smartgridview parameter",
    version="1.0.0"
)

origins = [
    "http://localhost:4200",  # Angular dev server
    "http://127.0.0.1:4200",
    "https://your-production-domain.com",  # Add your prod domain here
    "*"  # <-- Use only for testing; restrict this in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # Can use ["*"] for testing only
    allow_credentials=True,
    allow_methods=["*"],                # ["GET", "POST", ...]
    allow_headers=["*"],
)


# MongoDB connection manager
class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

db = MongoDB()

# MongoDB Startup Event
@app.on_event("startup")
async def startup_db_client():
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://chandans:hanTZ123$@neoinfra.owmvtzx.mongodb.net/")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "InfraDB")
    
    db.client = AsyncIOMotorClient(MONGODB_URL)
    db.database = db.client[DATABASE_NAME]
    
    try:
        await db.client.admin.command("ping")
        print("✅ Connected to MongoDB successfully!")
    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        raise

# MongoDB Shutdown Event
@app.on_event("shutdown")
async def shutdown_db_client():
    if db.client:
        db.client.close()

# Helper to convert ObjectId to str
def convert_objectid(doc):
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

@app.get("/get_menu_config")
async def get_menu_config(smartgridview: bool = Query(..., description="Set to true or false")):
    try:
        
        collection = db.database.get_collection("menu_config")

        # Fetch filtered data
        cursor = collection.find({})
        results = await cursor.to_list(length=None)

        # Optional: sort by 'visit_count' if smartgridview is True
        if smartgridview:
            for doc in results:
                doc["_id"] = str(doc["_id"])
                if smartgridview and "menu_config_data" in doc:
                    doc["menu_config_data"].sort(key=lambda x: x.get("visit_count", 0), reverse=True)

        # Convert ObjectId to string
        results = [convert_objectid(doc) for doc in results]

        return {
            "success": True,
            "smartgridview": smartgridview,
            "data": results,
            "count": len(results)
        }
    except Exception as e:
        print("❌ Exception:", str(e))
        raise HTTPException(status_code=500, detail=f"Error fetching data: {e}")


@app.post("/menu_count_config")
async def update_menu_visit_count(module: str = Query(..., description="Module name to update visit count")):
    try:
        collection = db.database.get_collection("menu_config")

        # Query using the 'module' field
        query = {"module": module}

        # Increment the 'visit_count' by 1
        update_result = await collection.update_one(query, {"$inc": {"visit_count": 1}})

        if update_result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Module not found")

        return {
            "success": True,
            "module": module,
            "message": "Visit count incremented"
        }

    except Exception as e:
        print("❌ Exception:", str(e))
        raise HTTPException(status_code=500, detail=f"Error updating visit count: {e}")
# Run with: `uvicorn this_file_name:app --reload`
