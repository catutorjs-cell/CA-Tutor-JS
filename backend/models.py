import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)
    user_id = Column(String, unique=True, index=True, nullable=False)  # Unique alpha-numeric ID e.g., CAJS1234
    exam_level = Column(String, nullable=False)  # Foundation, Intermediate, Final
    points = Column(Integer, default=0)
    streak = Column(Integer, default=1)
    accuracy_pct = Column(Float, default=85.0)
    revision_cycle = Column(Integer, default=1)  # Revision cycle tracker defaulting to 1
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    schedules = relationship("RevisionSchedule", back_populates="user")
    mistakes = relationship("MistakeLedger", back_populates="user")
    doubts = relationship("DoubtDecoderQuery", back_populates="user")
    pomodoro_sessions = relationship("PomodoroSession", back_populates="user")
    ocr_evaluations = relationship("OCREvaluation", back_populates="user")


class SyllabusChapter(Base):
    __tablename__ = "syllabus_chapters"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String, nullable=False)  # Foundation, Intermediate, Final
    subject = Column(String, nullable=False)
    chapter_name = Column(String, nullable=False)
    notes = Column(String, nullable=True)
    pdf_url = Column(String, nullable=True)
    illustrations = Column(String, nullable=True)  # JSON or text description of tax/accounting illustrations

class PastPaper(Base):
    __tablename__ = "past_papers"

    id = Column(Integer, primary_key=True, index=True)
    paper_type = Column(String, nullable=False)  # PYQ, RTP, MTP
    subject = Column(String, nullable=False)
    year = Column(Integer, nullable=False)  # e.g., 2020-2026
    title = Column(String, nullable=False)
    file_url = Column(String, nullable=True)

class RevisionSchedule(Base):
    __tablename__ = "revision_schedules"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    exam_date = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    scheduled_date = Column(String, nullable=False)  # YYYY-MM-DD
    chapter_name = Column(String, nullable=False)
    priority_level = Column(String, default="Medium")  # High (matching past trends), Medium, Low

    user = relationship("User", back_populates="schedules")

class MistakeLedger(Base):
    __tablename__ = "mistake_ledgers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    concept = Column(String, nullable=False)
    issue_type = Column(String, nullable=False)  # Concept Mistake, Calculation Issue, Incorrect Answer
    incorrect_details = Column(String, nullable=True)
    status = Column(String, default="Pending")  # Pending, Resolved
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="mistakes")

class DoubtDecoderQuery(Base):
    __tablename__ = "doubt_decoder_queries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    query_text = Column(String, nullable=False)
    syllabus_reference = Column(String, nullable=True)
    streamed_answer = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="doubts")

class PeerFollow(Base):
    __tablename__ = "peer_follows"

    id = Column(Integer, primary_key=True, index=True)
    follower_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    following_id = Column(Integer, ForeignKey("users.id"), nullable=False)

class PomodoroSession(Base):
    __tablename__ = "pomodoro_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(String, nullable=True)  # Room ID for Group Mode
    mode = Column(String, nullable=False)  # Solo, Group
    duration_minutes = Column(Integer, nullable=False)
    points_earned = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="pomodoro_sessions")

class OCREvaluation(Base):
    __tablename__ = "ocr_evaluations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    file_name = Column(String, nullable=False)
    doc_type = Column(String, nullable=False)  # Handwritten image, Typed PDF
    grade_score = Column(Integer, nullable=True)  # e.g., 85/100
    feedback = Column(String, nullable=True)  # Line-by-line constructive comments
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="ocr_evaluations")

class UserChapterProgress(Base):
    __tablename__ = "user_chapter_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    chapter_id = Column(Integer, ForeignKey("syllabus_chapters.id"), nullable=False)
    status = Column(String, default="Not Started")  # Not Started, Completed
    last_updated = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class ProgressArchive(Base):
    __tablename__ = "progress_archives"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    chapter_id = Column(Integer, ForeignKey("syllabus_chapters.id"), nullable=False)
    revision_cycle = Column(Integer, nullable=False)
    archived_at = Column(DateTime, default=datetime.datetime.utcnow)

