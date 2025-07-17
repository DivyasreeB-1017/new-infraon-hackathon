@echo off
echo Creating FastAPI Analytics API project structure...

:: Create main project directory
mkdir analytics_api
cd analytics_api

:: Create app directory and subdirectories
mkdir app
mkdir app\models
mkdir app\routes
mkdir app\services
mkdir app\utils

:: Create main application files
echo # FastAPI Analytics API > app\main.py
echo # Configuration settings > app\config.py
echo # MongoDB connection setup > app\db.py
echo # Dependency injection > app\dependencies.py
echo # Pydantic model for tracking > app\models\event.py
echo # POST /api/track endpoint > app\routes\track.py
echo # Mixpanel integration service > app\services\mixpanel_service.py
echo # MongoDB insert logic > app\services\mongo_service.py
echo # Logging utilities > app\utils\logger.py

:: Create empty __init__.py files for Python packages
echo. > app\__init__.py
echo. > app\models\__init__.py
echo. > app\routes\__init__.py
echo. > app\services\__init__.py
echo. > app\utils\__init__.py

:: Create environment and requirements files
echo # Environment variables > .env
echo # Python dependencies > requirements.txt

:: Create README
echo # Analytics API > README.md

echo.
echo FastAPI Analytics API project structure created successfully!
echo.
echo Directory structure:
tree /f

pause