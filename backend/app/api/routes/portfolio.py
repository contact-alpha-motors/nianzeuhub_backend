from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.db.models import PortfolioItem, User
from app.schemas import PortfolioItemResponse, PortfolioItemCreate, PortfolioItemUpdate
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=PortfolioItemResponse)
def create_portfolio_item(
    item_in: PortfolioItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = PortfolioItem(
        profile_id=current_user.id,
        **item_in.model_dump()
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/{item_id}", response_model=PortfolioItemResponse)
def update_portfolio_item(
    item_id: str,
    item_in: PortfolioItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id, PortfolioItem.profile_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    
    update_data = item_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
        
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}")
def delete_portfolio_item(
    item_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id, PortfolioItem.profile_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    
    db.delete(item)
    db.commit()
    return {"message": "Portfolio item deleted"}
