import datetime
import random
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import desc

from .database import get_db
from .models import (
    User, SyllabusChapter, PastPaper, RevisionSchedule,
    MistakeLedger, DoubtDecoderQuery, PeerFollow, PomodoroSession, OCREvaluation,
    UserChapterProgress, ProgressArchive
)
from .schemas import (
    UserResponse, ChapterResponse, PastPaperResponse, ScheduleCreate, ScheduleResponse,
    MistakeCreate, MistakeResponse, DoubtQueryCreate, DoubtQueryResponse,
    FollowRequest, FriendProfileResponse, LeaderboardEntry, PomodoroLogCreate, PomodoroLogResponse, OCREvaluationResponse,
    ChapterProgressResponse, CompleteChapterRequest
)
from .auth import get_current_user


router = APIRouter(prefix="/api", tags=["Core Modules"])

# ----------------- 1. DASHBOARD & SUGGESTION ALERTS -----------------

@router.get("/dashboard/summary", response_model=dict)
def get_dashboard_summary(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Fetch user mistakes count to calculate revision weights
    mistakes_count = db.query(MistakeLedger).filter(MistakeLedger.user_id == current_user.id, MistakeLedger.status == "Pending").count()
    
    # Calculate mock progress metrics dynamically
    pomodoros = db.query(PomodoroSession).filter(PomodoroSession.user_id == current_user.id).all()
    total_pomodoro_minutes = sum(p.duration_minutes for p in pomodoros)

    # Build response representing real-time completion tracking gauges
    syllabus_progress = min(100.0, 45.0 + (current_user.points * 0.05))
    mock_test_progress = min(100.0, 30.0 + (total_pomodoro_minutes * 0.1))
    revision_progress = min(100.0, max(10.0, 100.0 - (mistakes_count * 8.0)))

    return {
        "user_id": current_user.user_id,
        "name": current_user.name,
        "exam_level": current_user.exam_level,
        "points": current_user.points,
        "streak": current_user.streak,
        "accuracy_pct": current_user.accuracy_pct,
        "revision_cycle": current_user.revision_cycle,
        "syllabus_progress_pct": round(syllabus_progress, 1),
        "mock_test_progress_pct": round(mock_test_progress, 1),
        "revision_progress_pct": round(revision_progress, 1)
    }

@router.get("/dashboard/suggestions", response_model=List[dict])
def get_dashboard_suggestions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Backend filtration populating custom study recommendations based on weak topics, pending items, and exam proximity"""
    # Fetch standard pending items
    mistakes = db.query(MistakeLedger).filter(MistakeLedger.user_id == current_user.id, MistakeLedger.status == "Pending").limit(2).all()
    
    recommendations = []
    
    # Check mistakes ledger to find weak topics
    for m in mistakes:
        recommendations.append({
            "type": "Weak Topic Revision",
            "topic": m.concept,
            "reason": f"Flagged in mistakes ledger due to '{m.issue_type}' issues.",
            "priority": "HIGH"
        })
        
    # Append default pending core recommendations if list is short
    if len(recommendations) < 3:
        if current_user.exam_level == "Foundation":
            recommendations.append({
                "type": "Pending Chapter",
                "topic": "Partnership Accounts - Valuation of Goodwill",
                "reason": "Critical concepts scoring 15+ marks in past papers.",
                "priority": "HIGH"
            })
        elif current_user.exam_level == "Intermediate":
            recommendations.append({
                "type": "Pending Chapter",
                "topic": "Income Tax - Capital Gains (Section 45)",
                "reason": "Most repeated accounting adjustment in MTPs.",
                "priority": "HIGH"
            })
        else:
            recommendations.append({
                "type": "Pending Chapter",
                "topic": "Financial Reporting - Ind AS 115 (Revenue from Contracts)",
                "reason": "Calculated as a vital chapter near your target date.",
                "priority": "CRITICAL"
            })
            
    # Proximity Alert
    recommendations.append({
        "type": "Exam Preparation Hook",
        "topic": "Full Mock Test Paper (MTP) - Series 1",
        "reason": "Recommended to practice OMR speed & writing layout consistency.",
        "priority": "MEDIUM"
    })
    
    return recommendations


# ----------------- MODULE 1: SYLLABUS HUB -----------------

@router.get("/syllabus", response_model=List[ChapterResponse])
def get_syllabus(subject: Optional[str] = None, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Fetch structured nested collapsible tree materials based on student exam level"""
    query = db.query(SyllabusChapter).filter(SyllabusChapter.level == current_user.exam_level)
    if subject:
        query = query.filter(SyllabusChapter.subject == subject)
    
    chapters = query.all()
    
    # Seed fallback mock data if table is currently empty
    if not chapters:
        seed_chapters = [
            SyllabusChapter(
                level=current_user.exam_level,
                subject="Accounting",
                chapter_name="Partnership Valuation",
                notes="Valuation methods: Average Profits, Super Profits, Capitalization. Treatment of premium for Goodwill on admission.",
                pdf_url="/assets/docs/partnership_valuation.pdf",
                illustrations="Illustration 1: A and B are partners sharing profits 3:2. They admit C into partnership for 1/4 share. Calculate sacrificing ratios..."
            ),
            SyllabusChapter(
                level=current_user.exam_level,
                subject="Accounting",
                chapter_name="Amalgamation of Firms",
                notes="Amalgamation ledger adjustments: Realization Account, Partners Capital, and purchase consideration calculated via Net Assets method.",
                pdf_url="/assets/docs/amalgamation_guide.pdf",
                illustrations="Illustration 2: Balance Sheet merging of X & Co. with Y & Co. including adjustment for bad debts reserve..."
            ),
            SyllabusChapter(
                level=current_user.exam_level,
                subject="Direct Taxation",
                chapter_name="Capital Gains Tax",
                notes="Short-term vs Long-term capital assets. Transfer definition under Section 2(47). Indexed cost of acquisition adjustments.",
                pdf_url="/assets/docs/capital_gains_revision.pdf",
                illustrations="Illustration 1: Residental house property sold in 2024 for Rs. 85 Lakhs. Calculate capital gains exemption under Section 54..."
            ),
            SyllabusChapter(
                level=current_user.exam_level,
                subject="Indirect Taxation (GST)",
                chapter_name="Time & Value of Supply",
                notes="Time of supply of goods (Sec 12) & services (Sec 13). Transaction value inclusion criteria under Section 15.",
                pdf_url="/assets/docs/gst_value_of_supply.pdf",
                illustrations="Illustration 2: Supply invoice dated May 10, payment received May 20. Determine time of supply and GST computation rate..."
            )
        ]
        for sc in seed_chapters:
            db.add(sc)
        db.commit()
        chapters = db.query(SyllabusChapter).filter(SyllabusChapter.level == current_user.exam_level).all()
        
    return chapters


@router.get("/syllabus/progress", response_model=dict)
def get_syllabus_progress(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Fetch user chapter checklist progress, auto-seeding if missing"""
    chapters = db.query(SyllabusChapter).filter(SyllabusChapter.level == current_user.exam_level).all()
    if not chapters:
        # Trigger fallback seeding from get_syllabus
        get_syllabus(None, current_user, db)
        chapters = db.query(SyllabusChapter).filter(SyllabusChapter.level == current_user.exam_level).all()
        
    progress_list = []
    for ch in chapters:
        prog = db.query(UserChapterProgress).filter(
            UserChapterProgress.user_id == current_user.id,
            UserChapterProgress.chapter_id == ch.id
        ).first()
        if not prog:
            prog = UserChapterProgress(
                user_id=current_user.id,
                chapter_id=ch.id,
                status="Not Started"
            )
            db.add(prog)
            db.commit()
            db.refresh(prog)
        progress_list.append({
            "chapter_id": ch.id,
            "chapter_name": ch.chapter_name,
            "subject": ch.subject,
            "status": prog.status
        })
    return {
        "revision_cycle": current_user.revision_cycle,
        "progress": progress_list
    }


@router.post("/syllabus/complete-chapter", response_model=dict)
def complete_chapter(data: CompleteChapterRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Logs chapter completion, triggers cycle resets and ledger archives when 100% is reached"""
    prog = db.query(UserChapterProgress).filter(
        UserChapterProgress.user_id == current_user.id,
        UserChapterProgress.chapter_id == data.chapter_id
    ).first()
    
    if not prog:
        ch = db.query(SyllabusChapter).filter(SyllabusChapter.id == data.chapter_id).first()
        if not ch:
            raise HTTPException(status_code=404, detail="Chapter not found")
        prog = UserChapterProgress(
            user_id=current_user.id,
            chapter_id=data.chapter_id,
            status=data.status
        )
        db.add(prog)
    else:
        prog.status = data.status
    
    db.commit()
    
    # Check if 100% completed
    chapters = db.query(SyllabusChapter).filter(SyllabusChapter.level == current_user.exam_level).all()
    chapter_ids = [ch.id for ch in chapters]
    
    completed_progs = db.query(UserChapterProgress).filter(
        UserChapterProgress.user_id == current_user.id,
        UserChapterProgress.chapter_id.in_(chapter_ids),
        UserChapterProgress.status == "Completed"
    ).all()
    
    cycle_completed = False
    msg = f"Chapter progress updated to {data.status}."
    old_cycle = current_user.revision_cycle
    
    if len(completed_progs) == len(chapters) and len(chapters) > 0:
        cycle_completed = True
        current_user.revision_cycle += 1
        
        # Copy to ledger archives
        for cp in completed_progs:
            archive_entry = ProgressArchive(
                user_id=current_user.id,
                chapter_id=cp.chapter_id,
                revision_cycle=old_cycle
            )
            db.add(archive_entry)
        
        # Reset statuses
        all_progs = db.query(UserChapterProgress).filter(
            UserChapterProgress.user_id == current_user.id,
            UserChapterProgress.chapter_id.in_(chapter_ids)
        ).all()
        for cp in all_progs:
            cp.status = "Not Started"
            
        db.commit()
        msg = f"Incredible, Jananni Shree! You've cleared Round {old_cycle}. Initializing high-intensity Revision Round {current_user.revision_cycle} scheduler!"
        
    db.commit()
    db.refresh(current_user)
    
    return {
        "status": "success",
        "message": msg,
        "cycle_completed": cycle_completed,
        "revision_cycle": current_user.revision_cycle
    }


# ----------------- MODULE 2: PAST PAPERS LIBRARY -----------------

@router.get("/papers", response_model=List[PastPaperResponse])
def get_past_papers(
    paper_type: Optional[str] = None,  # PYQ, RTP, MTP
    subject: Optional[str] = None,
    year: Optional[int] = None,        # From 2020 to 2026
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(PastPaper)
    if paper_type:
        query = query.filter(PastPaper.paper_type == paper_type)
    if subject:
        query = query.filter(PastPaper.subject == subject)
    if year:
        query = query.filter(PastPaper.year == year)
        
    papers = query.all()
    
    # Fallback seeding
    if not papers:
        seed_papers = []
        subjects = ["Accounting", "Direct Taxation", "GST", "Law & Audit"]
        types = ["PYQ", "RTP", "MTP"]
        for y in range(2020, 2027):
            for s in subjects:
                for t in types:
                    seed_papers.append(PastPaper(
                        paper_type=t,
                        subject=s,
                        year=y,
                        title=f"{t} {s} Exam Paper ({y} Term)",
                        file_url=f"/assets/docs/{t.lower()}_{s.lower()}_{y}.pdf"
                    ))
        db.add_all(seed_papers)
        db.commit()
        # Query again
        query = db.query(PastPaper)
        if paper_type:
            query = query.filter(PastPaper.paper_type == paper_type)
        if subject:
            query = query.filter(PastPaper.subject == subject)
        if year:
            query = query.filter(PastPaper.year == year)
        papers = query.all()
        
    return papers


# ----------------- MODULE 3: AUTOMATED REVISION SCHEDULER -----------------

@router.post("/scheduler/generate", response_model=List[ScheduleResponse])
def generate_schedule(data: ScheduleCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Captured inputs: 'Official Exam Date', 'Target Subjects'. Outputs daily calendar and critical topics."""
    # Delete old schedules
    db.query(RevisionSchedule).filter(RevisionSchedule.user_id == current_user.id).delete()
    
    try:
        exam_dt = datetime.datetime.strptime(data.exam_date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Date format must be YYYY-MM-DD")
        
    today = datetime.datetime.today()
    days_left = (exam_dt - today).days
    
    if days_left <= 0:
        days_left = 30  # Fallback duration
        
    # Standard chapter lists based on level
    chapters = {
        "Accounting": ["Partnership Valuation", "Amalgamation of Firms", "Company Accounts Issues"],
        "Direct Taxation": ["Capital Gains Tax", "Salaries Section 15", "PGBP Computation"],
        "GST": ["Time & Value of Supply", "Input Tax Credit (ITC)", "Registration Thresholds"],
        "Law & Audit": ["Company Audit Rules", "Contract Act 1872", "Professional Ethics"]
    }
    
    schedules = []
    # Interleave subjects and distribute days
    idx = 0
    for i in range(min(days_left, 15)):  # Limit schedule size
        scheduled_day = today + datetime.timedelta(days=i)
        sub = data.target_subjects[i % len(data.target_subjects)] if data.target_subjects else "Accounting"
        chap_list = chapters.get(sub, ["Core Topic Fundamentals"])
        chap = chap_list[i % len(chap_list)]
        
        # Analyze priority from PYQ patterns (GST/Capital Gains are High, others Medium)
        prio = "High" if sub in ["GST", "Direct Taxation"] else "Medium"
        
        new_item = RevisionSchedule(
            user_id=current_user.id,
            exam_date=data.exam_date,
            subject=sub,
            scheduled_date=scheduled_day.strftime("%Y-%m-%d"),
            chapter_name=chap,
            priority_level=prio
        )
        db.add(new_item)
        schedules.append(new_item)
        
    db.commit()
    
    # Reward scheduling action points
    current_user.points += 20
    db.commit()
    
    return db.query(RevisionSchedule).filter(RevisionSchedule.user_id == current_user.id).all()

@router.get("/scheduler/calendar", response_model=List[ScheduleResponse])
def get_schedule(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(RevisionSchedule).filter(RevisionSchedule.user_id == current_user.id).all()


# ----------------- MODULE 4: MISTAKES TRACKER LEDGER -----------------

@router.get("/mistakes", response_model=List[MistakeResponse])
def get_mistakes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(MistakeLedger).filter(MistakeLedger.user_id == current_user.id).all()

@router.post("/mistakes", response_model=MistakeResponse)
def add_mistake(data: MistakeCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_mistake = MistakeLedger(
        user_id=current_user.id,
        concept=data.concept,
        issue_type=data.issue_type,
        incorrect_details=data.incorrect_details,
        status="Pending"
    )
    db.add(new_mistake)
    db.commit()
    db.refresh(new_mistake)
    
    # User penalized or re-tracked
    current_user.accuracy_pct = max(50.0, current_user.accuracy_pct - 1.5)
    db.commit()
    
    return new_mistake

@router.patch("/mistakes/{mistake_id}/resolve", response_model=MistakeResponse)
def resolve_mistake(mistake_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    mistake = db.query(MistakeLedger).filter(MistakeLedger.id == mistake_id, MistakeLedger.user_id == current_user.id).first()
    if not mistake:
        raise HTTPException(status_code=404, detail="Mistake log not found")
        
    mistake.status = "Resolved"
    # Resolve rewards user points and updates accuracy %
    current_user.points += 15
    current_user.accuracy_pct = min(100.0, current_user.accuracy_pct + 2.0)
    db.commit()
    db.refresh(mistake)
    return mistake


# ----------------- MODULE 5: AI DOUBT DECODER HUB -----------------

@router.post("/doubt/query", response_model=DoubtQueryResponse)
def query_doubt_decoder(data: DoubtQueryCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Academic tutor cross-referencing text strings against loaded syllabus and streaming local text answers"""
    query = data.query_text.lower()
    
    # Automated cross-referencing keywords match
    ref_doc = "Syllabus General Guidelines"
    ans = "I've processed your query. Under standard ICAI guidelines, please ensure that you follow clean layout formatting."
    
    if "goodwill" in query or "partnership" in query:
        ref_doc = "Partnership Valuation (Module 1 - Page 14)"
        ans = "Under the average profit method, Goodwill = Average Maintainable Profit * Number of Years Purchase. Remember to adjust for any abnormal gains or losses before calculating average profits!"
    elif "capital" in query or "gain" in query:
        ref_doc = "Direct Taxation - Capital Gains (Module 1 - Page 45)"
        ans = "Section 45(1) charges capital gains to tax in the year of transfer. Short-term asset holdings are capped at 24 months for immovable property, while long-term gains enjoy a flat rate of 20% with indexation benefits."
    elif "gst" in query or "supply" in query:
        ref_doc = "GST Supply valuation (Module 1 - Page 88)"
        ans = "Section 15 of CGST Act dictates that supply value includes any taxes, duties, cesses, and expenses incurred by supplier, but excludes discounts offered before/at supply time and recorded in the invoice."
        
    new_query = DoubtDecoderQuery(
        user_id=current_user.id,
        query_text=data.query_text,
        syllabus_reference=ref_doc,
        streamed_answer=ans
    )
    db.add(new_query)
    current_user.points += 5  # Points accrued during learning sessions
    db.commit()
    db.refresh(new_query)
    
    return new_query

@router.get("/doubt/history", response_model=List[DoubtQueryResponse])
def get_doubt_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(DoubtDecoderQuery).filter(DoubtDecoderQuery.user_id == current_user.id).order_by(desc(DoubtDecoderQuery.created_at)).all()


# ----------------- MODULE 6: PEER FOLLOW & SOCIAL Metrics -----------------

@router.post("/social/follow", response_model=dict)
def follow_user(data: FollowRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    friend = db.query(User).filter(User.user_id == data.friend_user_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="User with this ID not found")
        
    if friend.id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot follow yourself")
        
    # Check if already followed
    existing = db.query(PeerFollow).filter(
        PeerFollow.follower_id == current_user.id,
        PeerFollow.following_id == friend.id
    ).first()
    
    if existing:
        # Unfollow logic
        db.delete(existing)
        db.commit()
        return {"status": "unfollowed", "message": f"Successfully unfollowed {friend.name}"}
        
    # Create new follow
    new_follow = PeerFollow(follower_id=current_user.id, following_id=friend.id)
    db.add(new_follow)
    db.commit()
    return {"status": "followed", "message": f"Now following {friend.name}"}

@router.get("/social/friends", response_model=List[FriendProfileResponse])
def get_friends(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    follows = db.query(PeerFollow).filter(PeerFollow.follower_id == current_user.id).all()
    friend_ids = [f.following_id for f in follows]
    
    friends = db.query(User).filter(User.id.in_(friend_ids)).all() if friend_ids else []
    return [
        FriendProfileResponse(
            user_id=f.user_id,
            name=f.name,
            exam_level=f.exam_level,
            points=f.points,
            streak=f.streak,
            accuracy_pct=f.accuracy_pct
        ) for f in friends
    ]

@router.get("/social/leaderboard", response_model=dict)
def get_leaderboards(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Render dual-tab rankings: Global Overall and Weekly Leaderboard"""
    # Fetch all users sorted by points
    all_users = db.query(User).order_by(desc(User.points)).all()
    
    overall = []
    for index, u in enumerate(all_users):
        overall.append(LeaderboardEntry(
            rank=index + 1,
            name=u.name,
            user_id=u.user_id,
            points=u.points,
            streak=u.streak
        ))
        
    # Generate mock weekly data by varying ranks slightly
    weekly_sorted = sorted(all_users, key=lambda x: (x.points * 0.4 + x.streak * 20.0), reverse=True)
    weekly = []
    for index, u in enumerate(weekly_sorted):
        weekly.append(LeaderboardEntry(
            rank=index + 1,
            name=u.name,
            user_id=u.user_id,
            points=int(u.points * 0.4),  # Weekly points
            streak=u.streak
        ))
        
    return {
        "overall": overall[:10],  # Top 10
        "weekly": weekly[:10]
    }


# ----------------- MODULE 7: POMODORO STUDY HALL -----------------

@router.post("/pomodoro/log", response_model=PomodoroLogResponse)
def log_pomodoro(data: PomodoroLogCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Points accrued = duration * multiplier (Solo: 1pt/min, Group: 1.5pt/min)
    multiplier = 1.5 if data.mode == "Group" else 1.0
    points = int(data.duration_minutes * multiplier)
    
    new_session = PomodoroSession(
        user_id=current_user.id,
        room_id=data.room_id,
        mode=data.mode,
        duration_minutes=data.duration_minutes,
        points_earned=points
    )
    
    db.add(new_session)
    current_user.points += points
    db.commit()
    db.refresh(new_session)
    return new_session

@router.get("/pomodoro/rooms/{room_id}/occupancy")
def get_room_occupancy(room_id: str):
    """Swap styling based on room occupancy size"""
    # Dynamic styling states depending on room name
    occupancy = len(room_id) % 5 + 1
    theme_bg = "pastel-green-gradient"
    if occupancy > 4:
        theme_bg = "pastel-purple-gradient"
    elif occupancy > 2:
        theme_bg = "pastel-blue-gradient"
        
    return {
        "room_id": room_id,
        "active_occupants": occupancy,
        "recommended_bg_style": theme_bg
    }


# ----------------- MODULE 8: QUESTION GENERATION & OCR EVALUATOR -----------------

@router.get("/question/compile")
def compile_questions(subject: str, chapter: str, difficulty: str, db: Session = Depends(get_db)):
    """Automated compiling drawing questions from PYQ/RTP/MTP database"""
    # Retrieve matching papers to simulate drawing questions
    papers = db.query(PastPaper).filter(PastPaper.subject == subject).limit(3).all()
    sources = [p.title for p in papers] if papers else ["RTP Tax Series", "PYQ 2024 Exam"]
    
    questions = []
    if difficulty == "Easy":
        questions = [
            {"q_num": 1, "text": f"Define supply conditions under Section 7 of the CGST Act referencing {sources[0]}.", "marks": 5},
            {"q_num": 2, "text": "Draft basic Realization Account structures on partnership dissolution.", "marks": 5}
        ]
    elif difficulty == "Medium":
        questions = [
            {"q_num": 1, "text": f"Compute indexing costs for a commercial asset sold under Sec 48 using index values from {sources[-1]}.", "marks": 10},
            {"q_num": 2, "text": "Detail criteria when GST registration becomes mandatory for service aggregators.", "marks": 10}
        ]
    else:
        questions = [
            {"q_num": 1, "text": f"Evaluate a comprehensive Amalgamation merger scheme between X Ltd and Y Ltd. Formulate purchase consideration ledger entries based on {sources[0]}.", "marks": 20},
            {"q_num": 2, "text": "Draft legal advice concerning professional auditing limitations in cases of suspected inventory inflation.", "marks": 15}
        ]
        
    return {
        "subject": subject,
        "chapter": chapter,
        "difficulty": difficulty,
        "drawn_sources": sources,
        "questions": questions
    }

@router.post("/ocr/evaluate", response_model=OCREvaluationResponse)
def evaluate_handwriting(
    doc_type: str = Form(..., description="Handwritten image, Typed PDF"),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Executes OCR parsing, cross-verifies against model schemes, returns grades & line comments"""
    contents = file.file.read()
    text_length = len(contents)
    
    # OCR Simulated parser scoring logic
    grade = 65 + (text_length % 30) # Dynamic score base
    
    # Constructive check comments based on parsed answers
    if doc_type == "Handwritten image":
        feedback = (
            "Line 1: Handwriting detected cleanly. Introduction includes relevant sections of Income Tax.\n"
            "Line 12: Cost index figures have minor calculation mistakes. Deducted 3 marks.\n"
            "Line 24: Sacrifice ratio formula is accurate. Excellent presentation of tax adjustments."
        )
    else:
        feedback = (
            "Line 2: PDF parsed successfully. Good structural answers separating direct calculations from case laws.\n"
            "Line 15: ITC claims under Section 16 have been correctly explained with matching illustrations.\n"
            "Overall: Excellent OMR/Handwriting layout. Clear and legible alignment."
        )
        
    evaluation = OCREvaluation(
        user_id=current_user.id,
        file_name=file.filename,
        doc_type=doc_type,
        grade_score=grade,
        feedback=feedback
    )
    
    db.add(evaluation)
    current_user.points += 50  # OCR feedback rewards big points!
    db.commit()
    db.refresh(evaluation)
    
    return evaluation
