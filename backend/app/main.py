from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text  # Import text to write raw SQL
from app.db.session import get_db, engine
from app.db.base import Base
from app.api.v1.endpoints import chat, finance

app = FastAPI(title = "MarketMind", version = "1.0.0")

# 1. Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Register Routes
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(finance.router, prefix="/api/v1/finance", tags=["finance"])

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        # Try to execute a simple SQL query
        db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}