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
    item = Experience(
        profile_id=current_user.id,
        **item_in.model_dump()
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{item_id}", response_model=ExperienceResponse)
def update_experience(
    item_id: str,
    item_in: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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

@router.delete("/{item_id}")
def delete_experience(
    item_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(Experience).filter(Experience.id == item_id, Experience.profile_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    db.delete(item)
    db.commit()
    return {"message": "Experience deleted"}
