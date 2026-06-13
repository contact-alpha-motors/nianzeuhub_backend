import traceback
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.database import get_db
from app.db.models import Profile, User
from app.schemas import ProfileResponse, FullProfileResponse, ProfileUpdate
from app.api.deps import get_current_user

router = APIRouter()

@router.get("/", response_model=List[ProfileResponse])
def get_talents(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    keyword: Optional[str] = None,
    domain: Optional[str] = None,
    level: Optional[str] = None,
):
    try:
        query = db.query(Profile)
        if keyword:
            query = query.filter(Profile.title.ilike(f"%{keyword}%") | Profile.bio.ilike(f"%{keyword}%"))
        if domain:
            query = query.filter(Profile.skills.any(domain))
        if level:
            query = query.filter(Profile.experience_level == level)
            
        profiles = query.offset(skip).limit(limit).all()
        return profiles
    except HTTPException:
        raise
    except Exception as e:
        print(f"[TALENTS/GET_ALL ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to fetch talents: {e}")

@router.get("/{talent_id}", response_model=FullProfileResponse)
def get_talent(talent_id: str, db: Session = Depends(get_db)):
    try:
        profile = db.query(Profile).filter(Profile.id == talent_id).first()
        if not profile:
            raise HTTPException(status_code=404, detail="Talent not found")
        return profile
    except HTTPException:
        raise
    except Exception as e:
        print(f"[TALENTS/GET_ONE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to fetch talent: {e}")

@router.put("/me", response_model=ProfileResponse)
def update_profile(
    profile_in: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        profile = db.query(Profile).filter(Profile.id == current_user.id).first()
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        update_data = profile_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(profile, field, value)
            
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile
    except HTTPException:
        raise
    except Exception as e:
        print(f"[TALENTS/UPDATE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {e}")
