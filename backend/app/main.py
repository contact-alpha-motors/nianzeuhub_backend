import traceback
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

from app.api.routes import api_router
from app.core.config import settings
from app.db.database import Base, engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables
    print("Creating database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully.")
    except Exception as e:
        print(f"Failed to create database tables: {e}")
        print("Application will continue to start, but database operations will fail.")
    yield
    # Shutdown
    print("Application shutting down.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

# Log all unhandled exceptions to the terminal with full traceback
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"\n=== UNHANDLED EXCEPTION on {request.method} {request.url} ===")
    traceback.print_exc()
    print("========================================\n")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )

# CORS: allow the frontend and localhost for dev
origins = [
    settings.FRONTEND_URL,
    "http://localhost:3000",
    "http://localhost:9002",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to Nianzeuhub API", "docs": "/docs"}