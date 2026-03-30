from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Conversation, Message
from app.schemas.schemas import MessageCreate, MessageResponse, ChatHistory
import uuid

from backend.app.services.document_service import search_documents

router = APIRouter()

@router.post("/message", response_model=MessageResponse)
def send_message(payload: MessageCreate, db: Session = Depends(get_db)):
    # 1. Get or Create Conversation
    if not payload.conversation_id:
        conversation = Conversation(title="New Chat")
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        conversation_id = conversation.id
    else:
        conversation_id = payload.conversation_id

    # 2. Save User Message
    user_msg = Message(
        conversation_id=conversation_id,
        role="user",
        content=payload.content
    )
    db.add(user_msg)

    # --- 2. THE RAG PIPELINE: SEARCH THE DATABASE ---
    print(f"Searching database for: {payload.content}")
    retrieved_context = search_documents(payload.content, db)
    
   # --- 3. BUILD THE AI RESPONSE ---
    if retrieved_context.strip():
        # If we found matches in the PDF, show them!
        ai_content = f"**I searched your documents and found this context:**\n\n{retrieved_context}\n\n*(In the next sprint, a real LLM will read this and write a conversational answer!)*"
    else:
        ai_content = f"I received: '{payload.content}'. (No relevant documents found in my memory)."

    ai_msg = Message(
        conversation_id=conversation_id,
        role="assistant",
        content=ai_content
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)
    
    return ai_msg