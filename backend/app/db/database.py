from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# Make sure to handle both asyncpg and psycopg2. We use psycopg2 here for simplicity in initial setup, or standard postgresql url.
# Replacing postgresql:// with postgresql+psycopg2:// if needed, but SQLAlchemy 2.0 works well with it.
engine = create_engine(settings.DATABASE_URL.replace("postgres://", "postgresql://"), pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
