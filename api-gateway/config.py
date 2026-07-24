import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    HOST = os.getenv("HOST", "0.0.0.0")  # nosec B104
    PORT = int(os.getenv("PORT", 8080))

    DEBUG = os.getenv("DEBUG", "False").lower() == "true"

    AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:5000")

    DASHBOARD_SERVICE_URL = os.getenv("DASHBOARD_SERVICE_URL", "http://localhost:5001")
