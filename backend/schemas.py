from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# Auth Schemas
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    exam_level: str = Field(..., description="Foundation, Intermediate, Final")
    password: str = Field(..., min_length=6)
    confirm_password: str

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    user_id: str
    exam_level: str
    points: int
    streak: int
    accuracy_pct: float
    revision_cycle: int
    created_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Syllabus Material Schemas
class ChapterResponse(BaseModel):
    id: int
    level: str
    subject: str
    chapter_name: str
    notes: Optional[str]
    pdf_url: Optional[str]
    illustrations: Optional[str]

    class Config:
        orm_mode = True

# Past Papers Schemas
class PastPaperResponse(BaseModel):
    id: int
    paper_type: str
    subject: str
    year: int
    title: str
    file_url: Optional[str]

    class Config:
        orm_mode = True

# Revision Scheduler Schemas
class ScheduleCreate(BaseModel):
    exam_date: str
    target_subjects: List[str]

class ScheduleResponse(BaseModel):
    id: int
    user_id: int
    exam_date: str
    subject: str
    scheduled_date: str
    chapter_name: str
    priority_level: str

    class Config:
        orm_mode = True

# Mistakes Tracker Schemas
class MistakeCreate(BaseModel):
    concept: str
    issue_type: str
    incorrect_details: Optional[str]

class MistakeResponse(BaseModel):
    id: int
    user_id: int
    concept: str
    issue_type: str
    incorrect_details: Optional[str]
    status: str
    created_at: datetime

    class Config:
        orm_mode = True

# AI Doubt Decoder Schemas
class DoubtQueryCreate(BaseModel):
    query_text: str

class DoubtQueryResponse(BaseModel):
    id: int
    user_id: int
    query_text: str
    syllabus_reference: Optional[str]
    streamed_answer: str
    created_at: datetime

    class Config:
        orm_mode = True

# Peer Social Schemas
class FollowRequest(BaseModel):
    friend_user_id: str

class FriendProfileResponse(BaseModel):
    user_id: str
    name: str
    exam_level: str
    points: int
    streak: int
    accuracy_pct: float

# Leaderboard Schemas
class LeaderboardEntry(BaseModel):
    rank: int
    name: str
    user_id: str
    points: int
    streak: int

# Pomodoro Study Hall Schemas
class PomodoroLogCreate(BaseModel):
    room_id: Optional[str] = None
    mode: str  # Solo, Group
    duration_minutes: int

class PomodoroLogResponse(BaseModel):
    id: int
    user_id: int
    room_id: Optional[str]
    mode: str
    duration_minutes: int
    points_earned: int
    created_at: datetime

    class Config:
        orm_mode = True

# OCR Evaluator Schemas
class OCREvaluationResponse(BaseModel):
    id: int
    user_id: int
    file_name: str
    doc_type: str
    grade_score: int
    feedback: str
    created_at: datetime

    class Config:
        orm_mode = True

# Chapter Progress Schemas
class ChapterProgressResponse(BaseModel):
    id: int
    user_id: int
    chapter_id: int
    status: str
    last_updated: datetime

    class Config:
        orm_mode = True

class CompleteChapterRequest(BaseModel):
    chapter_id: int
    status: str  # "Completed" or "Not Started"

