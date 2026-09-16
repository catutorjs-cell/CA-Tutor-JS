from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .auth import router as auth_router
from .controllers import router as core_router

# Create SQLite Database tables upon launch
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CA JS Success Suite API",
    description="Backend controllers, schemas, and schemas aggregating Auth, Syllabus, Past Papers, Revision Scheduler, Mistakes Tracker, Doubt Decoder, leaderboards, Pomodoro timing systems, and OMR OCR evaluator modules.",
    version="1.0.0"
)

# CORS middleware for Next.js views and Flutter mobile integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aggregated Routers
app.include_router(auth_router)
app.include_router(core_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to CA JS Success Suite Production API Server!",
        "version": "1.0.0",
        "theme": "Soft Pastel Blue & Pink Design System",
        "documentation": "/docs"
    }
