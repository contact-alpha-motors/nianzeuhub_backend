import uuid
from sqlalchemy import Column, String, Text, Numeric, Boolean, Integer, Date, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum
from app.db.database import Base

class RoleEnum(str, enum.Enum):
    admin = "admin"
    talent = "talent"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    profile = relationship("Profile", back_populates="user", uselist=False)

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    role = Column(Enum(RoleEnum), default=RoleEnum.talent)
    name = Column(String, nullable=False)
    title = Column(String)
    location = Column(String)
    availability = Column(String)
    experience_level = Column(String)
    bio = Column(Text)
    rate = Column(Numeric)
    photo_url = Column(String)
    photo_hint = Column(String)
    contact_email = Column(String)
    contact_whatsapp = Column(String)
    use_internal_form = Column(Boolean, default=True)
    skills = Column(ARRAY(String))
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="profile")
    portfolio_items = relationship("PortfolioItem", back_populates="profile", cascade="all, delete-orphan")
    experiences = relationship("Experience", back_populates="profile", cascade="all, delete-orphan")
    certifications = relationship("Certification", back_populates="profile", cascade="all, delete-orphan")
    stats = relationship("ProfileStats", back_populates="profile", uselist=False, cascade="all, delete-orphan")

class PortfolioItem(Base):
    __tablename__ = "portfolio_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"))
    type = Column(String) # image, pdf, video, link
    title = Column(String)
    description = Column(Text)
    url = Column(String)
    thumbnail_url = Column(String)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    profile = relationship("Profile", back_populates="portfolio_items")

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"))
    title = Column(String)
    company = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    profile = relationship("Profile", back_populates="experiences")

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"))
    name = Column(String)
    issuing_organization = Column(String)
    date_awarded = Column(String)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    profile = relationship("Profile", back_populates="certifications")

class ProfileStats(Base):
    __tablename__ = "profile_stats"

    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), primary_key=True)
    total_views = Column(Integer, default=0)
    total_contacts = Column(Integer, default=0)
    search_appearances = Column(Integer, default=0)

    profile = relationship("Profile", back_populates="stats")

class MonthlyStats(Base):
    __tablename__ = "monthly_stats"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"))
    month = Column(Date)
    views = Column(Integer, default=0)
    contacts = Column(Integer, default=0)
