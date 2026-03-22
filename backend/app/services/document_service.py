from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from sqlalchemy.orm import Session
from app.db.models import DocumentEmbedding
import tempfile
import os

# Initialize the free, local embedding model
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def process_and_store_document(file_bytes: bytes, filename: str, db: Session):
    """ Reads a PDF file, splits it into chunks, and stores the embeddings in the database. """

    #1. Save uploaded file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(file_bytes)
        temp_file_path = temp_file.name

    try:
        #2. Load the document
        loader = PyPDFLoader(temp_file_path)
        documents = loader.load()

        #3. Split the documents into chunks
        # We split the document into 1000-character chunks with a 200-char overlap
        # Overlap prevents cutting a sentence or thought in half.
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, length_function=len)
        chunks = text_splitter.split_documents(documents)

        #4. Embed the chunks and store in the database
        for chunk in chunks:
            # Generate the vector embedding for the chunk
            vector_embedding = embeddings.embed_query(chunk.page_content)

            # Store the chunk in the database
            db_record = DocumentEmbedding(filename=filename, content=chunk.page_content, embedding=vector_embedding)
            db.add(db_record)

            db.commit()
            return {"status": "success", "chunk_processed": len(chunks)}

    finally:
        #5. Clean up the temporary file
        os.remove(temp_file_path)
