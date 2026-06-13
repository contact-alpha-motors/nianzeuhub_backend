import traceback
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import ProfileStats, User
from app.schemas import ProfileStatsResponse
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/me", response_model=ProfileStatsResponse)
def get_my_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        stats = db.query(ProfileStats).filter(ProfileStats.profile_id == current_user.id).first()
        if not stats:
            # Create empty stats if none exist
            stats = ProfileStats(profile_id=current_user.id)
            db.add(stats)
            db.commit()
            db.refresh(stats)
        return stats
    except HTTPException:
        raise
    except Exception as e:
        print(f"[STATS/GET_ME ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {e}")
