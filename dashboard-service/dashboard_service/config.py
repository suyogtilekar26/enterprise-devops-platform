import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    HOST = os.getenv("HOST", "0.0.0.0")  # nosec B104
    PORT = int(os.getenv("PORT", 5001))
    DEBUG = os.getenv("DEBUG", "True") == "True"

    # Database
    DATABASE_HOST = os.getenv("DATABASE_HOST", "postgres-service")
    DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")
    DATABASE_NAME = os.getenv("DATABASE_NAME", "enterprise_db")
    DATABASE_USER = os.getenv("DATABASE_USER", "enterprise_user")
    DATABASE_PASSWORD = os.getenv(
        "DATABASE_PASSWORD",
        "enterprise_password"
    )

    DATABASE_URI = (
        f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}"
        f"@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
    )
