from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text  # Import text to write raw SQL
from app.db.session import get_db, engine
from app.db.base import Base

from app.db import models

from app.api.v1.endpoints import chat, finance, documents

# --- 2. ADD THIS BLOCK: Enable vector extension BEFORE creating tables ---
with engine.connect() as conn:
    conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    conn.commit()

# Now when this runs, it will see the missing table and create it safely.
Base.metadata.create_all(bind=engine)

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
app.include_router(documents.router, prefix="/api/v1/documents", tags=["documents"])
