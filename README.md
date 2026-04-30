MarketMind 🧠📉
Full-Stack AI Financial Assistant (Retrieval-Augmented Generation)

MarketMind is a secure, fully-localized full-stack application that allows users to chat intelligently with dense financial documents (PDFs). Built with privacy in mind, it utilizes a Retrieval-Augmented Generation (RAG) architecture to ensure AI responses are strictly grounded in user-provided factual data, with the ability to run 100% offline using local LLMs.

🚀 Key Features
Secure Document Ingestion: Upload complex financial PDFs directly through the UI. Documents are parsed, chunked, and mathematically embedded using local sentence-transformers (all-MiniLM-L6-v2) to guarantee zero data leakage.

Vector Database Retrieval: Utilizes a containerized PostgreSQL database with the pgvector extension to perform lightning-fast Cosine Similarity searches, fetching the most relevant document context in milliseconds.

Intelligent Chat Interface: A responsive React frontend featuring asynchronous state management, real-time typing indicators, and seamless FormData file handling.

Dynamic AI Generation: Orchestrated via LangChain, the backend intercepts user queries, injects database context, and leverages Meta's Llama 3.2 (via Ollama) or OpenAI (gpt-4o-mini) to generate highly accurate, hallucination-free answers.

🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS, Lucide-React

Backend: Python, FastAPI, SQLAlchemy, Uvicorn

AI & Machine Learning: LangChain, HuggingFace (sentence-transformers), PyPDF, Ollama (Llama 3.2), OpenAI API

Database & Infrastructure: PostgreSQL, pgvector, Docker, Docker Compose

💻 Local Development Setup
Follow these steps to get the full stack running on your local machine.

Prerequisites
Docker Desktop installed and running.

Python 3.10+ installed.

Node.js & npm installed.

(Optional but recommended) Ollama installed for local LLM inference.

1. Database Setup (Docker)
Start the PostgreSQL database configured with the pgvector extension.

Bash
# Navigate to the project root where docker-compose.yml is located
docker-compose up -d
Note: The database runs on port 5433 by default with the username admin and password adminpassword.

2. Backend Setup (FastAPI)
Open a new terminal window and set up the Python environment.

Bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload
The backend API will be available at http://localhost:8000.

3. AI Model Setup (Ollama)
If using the local Llama 3.2 model for complete data privacy, ensure Ollama is running and pull the model:

Bash
ollama run llama3.2
4. Frontend Setup (React)
Open a new terminal window and start the UI interface.

Bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
The React UI will be available at http://localhost:3000.

📖 How to Use
Open the application in your browser (http://localhost:3000).

Click the Paperclip Icon in the chat input to upload a financial PDF (e.g., an annual report, resume, or tax document).

Wait for the success notification confirming the document has been vectorized and stored.

Ask a specific question about the uploaded document in the chat. The AI will retrieve the exact paragraphs from the database and formulate an answer!

Special Commands: Type /stock [TICKER] (e.g., /stock AAPL) to test the mock market data integration.

🗺️ Roadmap (Upcoming Features)
Sprint 5: Transitioning to Agentic AI (Tool/Function Calling) to allow the LLM to autonomously route questions to either the RAG database, a calculator, or live stock APIs.

Sprint 6: Multi-Agent collaboration using CrewAI.

Sprint 7: Cloud deployment to Microsoft Azure.
