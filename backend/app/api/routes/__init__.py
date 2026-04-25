from fastapi import APIRouter

from app.api.routes import auth, talents, portfolio, experience, certifications, stats

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(talents.router, prefix="/talents", tags=["talents"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(experience.router, prefix="/experience", tags=["experience"])
api_router.include_router(certifications.router, prefix="/certifications", tags=["certifications"])
api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
