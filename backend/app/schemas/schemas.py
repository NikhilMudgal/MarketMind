from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

# 1. Schema for creating a message (Frontend -> Backend)
class MessageCreate(BaseModel):
    content: str
    conversation_id: Optional[UUID] = None # If null, create new chat

# 2. Schema for returning a message (Backend -> Frontend)
class MessageResponse(BaseModel):
    id: UUID
    role: str
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# 3. Schema for a full chat history
class ChatHistory(BaseModel):
    conversation_id: UUID
    messages: List[MessageResponse]