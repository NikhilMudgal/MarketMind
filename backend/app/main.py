from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text  # Import text to write raw SQL
from db.session import get_db

app = FastAPI(title = "MarketMind", version = "1.0.0")

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        # Try to execute a simple SQL query
        db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}