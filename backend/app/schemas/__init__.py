from pydantic import BaseModel, EmailStr, UUID4, ConfigDict
from typing import Optional, List
from datetime import datetime, date
from app.db.models import RoleEnum

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: UUID4
    email: EmailStr
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Profile
class ProfileBase(BaseModel):
    name: str
    title: Optional[str] = None
    location: Optional[str] = None
    availability: Optional[str] = None
    experience_level: Optional[str] = None
    bio: Optional[str] = None
    rate: Optional[float] = None
    photo_url: Optional[str] = None
    photo_hint: Optional[str] = None
    contact_email: Optional[str] = None
    contact_whatsapp: Optional[str] = None
    use_internal_form: bool = True
    skills: List[str] = []

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    name: Optional[str] = None

class ProfileResponse(ProfileBase):
    id: UUID4
    role: RoleEnum
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Portfolio
class PortfolioItemBase(BaseModel):
    type: str
    title: str
    description: Optional[str] = None
    url: Optional[str] = None
    thumbnail_url: Optional[str] = None

class PortfolioItemCreate(PortfolioItemBase):
    pass

class PortfolioItemUpdate(PortfolioItemBase):
    type: Optional[str] = None
    title: Optional[str] = None

class PortfolioItemResponse(PortfolioItemBase):
    id: UUID4
    profile_id: UUID4
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Experience
class ExperienceBase(BaseModel):
    title: str
    company: str
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(ExperienceBase):
    title: Optional[str] = None
    company: Optional[str] = None
    start_date: Optional[str] = None

class ExperienceResponse(ExperienceBase):
    id: UUID4
    profile_id: UUID4
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Certification
class CertificationBase(BaseModel):
    name: str
    issuing_organization: str
    date_awarded: str

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(CertificationBase):
    name: Optional[str] = None
    issuing_organization: Optional[str] = None
    date_awarded: Optional[str] = None

class CertificationResponse(CertificationBase):
    id: UUID4
    profile_id: UUID4
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Stats
class ProfileStatsResponse(BaseModel):
    profile_id: UUID4
    total_views: int
    total_contacts: int
    search_appearances: int
    model_config = ConfigDict(from_attributes=True)

class FullProfileResponse(ProfileResponse):
    portfolio_items: List[PortfolioItemResponse] = []
    experiences: List[ExperienceResponse] = []
    certifications: List[CertificationResponse] = []
    stats: Optional[ProfileStatsResponse] = None
    model_config = ConfigDict(from_attributes=True)
