import traceback
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Certification, User
from app.schemas import CertificationResponse, CertificationCreate, CertificationUpdate
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=CertificationResponse)
def create_certification(
    item_in: CertificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        item = Certification(
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
        print(f"[CERTIFICATIONS/CREATE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to create certification: {e}")

@router.put("/{item_id}", response_model=CertificationResponse)
def update_certification(
    item_id: str,
    item_in: CertificationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        item = db.query(Certification).filter(Certification.id == item_id, Certification.profile_id == current_user.id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Certification not found")
        
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
        print(f"[CERTIFICATIONS/UPDATE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to update certification: {e}")

@router.delete("/{item_id}")
def delete_certification(
    item_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        item = db.query(Certification).filter(Certification.id == item_id, Certification.profile_id == current_user.id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Certification not found")
        
        db.delete(item)
        db.commit()
        return {"message": "Certification deleted"}
    except HTTPException:
        raise
    except Exception as e:
        print(f"[CERTIFICATIONS/DELETE ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to delete certification: {e}")
