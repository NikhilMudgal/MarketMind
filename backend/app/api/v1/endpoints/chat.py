from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import Conversation, Message
from app.schemas.schemas import MessageCreate, MessageResponse
from app.services.document_service import search_documents

# --- 1. NEW IMPORTS FOR OLLAMA ---
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate


router = APIRouter()

# --- 2. INITIALIZE THE FREE LOCAL LLM ---
# This points to the model you just downloaded via Ollama
llm = ChatOllama(model="llama3.2")

# --- 3. CREATE THE SYSTEM PROMPT ---
system_prompt = """
You are MarketMind, an expert financial analyst assistant. 
Use the following pieces of retrieved context to answer the user's question. 
If you don't know the answer, or if the answer is not in the context, just say that you don't know. 
Do not make up information. Keep your answer concise and professional.

Context:
{context}
"""
prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("user", "{question}")
])

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

    # --- THE RAG PIPELINE: SEARCH THE DATABASE ---
    print(f"Searching database for: {payload.content}")
    retrieved_context = search_documents(payload.content, db)
    
   # Generate the AI Response
    if retrieved_context.strip():
        chain = prompt_template | llm
        response = chain.invoke({
            "context": retrieved_context,
            "question": payload.content
        })
        ai_content = response.content
    else:
        response = llm.invoke(payload.content)
        ai_content = response.content

    ai_msg = Message(
        conversation_id=conversation_id,
        role="assistant",
        content=ai_content
    )
    db.add(ai_msg)
    db.commit()
    db.refresh(ai_msg)
    
    return ai_msg