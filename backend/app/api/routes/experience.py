import traceback
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.db.models import Experience, User
from app.schemas import ExperienceResponse, ExperienceCreate, ExperienceUpdate
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=ExperienceResponse)
def create_experience(
    item_in: ExperienceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        item = Experience(
            profile_id=current_user.id,
            **item_in.model_dump()
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
    except HTTPException:
        raise
    except Exception as e:
        print(f"[EXPERIENCE/CREATE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to create experience: {e}")

@router.put("/{item_id}", response_model=ExperienceResponse)
def update_experience(
    item_id: str,
    item_in: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        item = db.query(Experience).filter(Experience.id == item_id, Experience.profile_id == current_user.id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Experience not found")
        
        update_data = item_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(item, field, value)
            
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
    except HTTPException:
        raise
    except Exception as e:
        print(f"[EXPERIENCE/UPDATE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to update experience: {e}")

@router.delete("/{item_id}")
def delete_experience(
    item_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        item = db.query(Experience).filter(Experience.id == item_id, Experience.profile_id == current_user.id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Experience not found")
        
        db.delete(item)
        db.commit()
        return {"message": "Experience deleted"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"[EXPERIENCE/DELETE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to delete experience: {e}")
