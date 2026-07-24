import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", 8080))

    AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:5000")

    DASHBOARD_SERVICE_URL = os.getenv("DASHBOARD_SERVICE_URL", "http://localhost:5001")
