import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    HOST = os.getenv("HOST", "0.0.0.0")  # nosec B104
    PORT = int(os.getenv("PORT", 5001))
    DEBUG = os.getenv("DEBUG", "True") == "True"
