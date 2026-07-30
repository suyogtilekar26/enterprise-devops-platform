import os
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()


class Config:
    """Base configuration."""

    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret-key")
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "change-this-jwt-secret-key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        minutes=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 30))
    )

    # Server
    HOST = os.getenv("HOST", "0.0.0.0")  # nosec B104
    PORT = int(os.getenv("PORT", 5000))

    # CORS
    CORS_HEADERS = "Content-Type"

    # Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT", "DEV")

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
