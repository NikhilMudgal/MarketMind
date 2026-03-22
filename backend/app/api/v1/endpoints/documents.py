from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.document_service import process_and_store_document

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        # Read file into memory
        file_bytes = await file.read()
        
        # Process it
        result = process_and_store_document(file_bytes, file.filename, db)
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))