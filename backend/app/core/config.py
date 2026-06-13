from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Nianzeuhub"
    API_V1_STR: str = "/api"
    
    SECRET_KEY: str = "supersecretkey_please_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    DATABASE_URL_LOCAL: str = "postgresql://postgres:postgres@localhost:5432/nianzeuhub"
    DATABASE_URL_EXTERNAL: str = "postgresql://admin:ZWfFGlEFVDhUU7S2BCnCQM1aHkzOjEzi@dpg-d8mit7urnols73cmhgrg-a.oregon-postgres.render.com/nianzeuhub"
    DATABASE_URL: str = "postgresql://admin:ZWfFGlEFVDhUU7S2BCnCQM1aHkzOjEzi@dpg-d8mit7urnols73cmhgrg-a/nianzeuhub"
    
    # Frontend URL for CORS (set on Railway as env var)
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Railway injects PORT
    PORT: int = 8000
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
