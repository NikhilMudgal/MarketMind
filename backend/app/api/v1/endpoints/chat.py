from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Conversation, Message
from app.schemas import MessageCreate, MessageResponse, ChatHistory
import uuid

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
    
    # 3. Generate AI Response (Mock logic for Sprint 1)
    # TODO: In Sprint 4, we replace this with the real Agent.
    ai_content = f"Echo: You said '{payload.content}'. I am MarketMind (v1)."
    
    ai_msg = Message(
        conversation_id=conversation_id,
        role="assistant",
        content=ai_content
    )
    db.add(ai_msg)
    
    db.commit()
    db.refresh(ai_msg)
    
    return ai_msg