
# 🤖 AI Engineer Team

## 📌 Overview

**Working Folder:** `/ai-engineer/`

### 🎯 Role

The AI Engineer Team is responsible for developing an intelligent chatbot assistant for the Smart Campus platform. The chatbot leverages **LangChain**, **OpenAI API**, and **Retrieval-Augmented Generation (RAG)** to answer student queries using institutional documents and knowledge bases.

---

# 🚀 Features

- 🤖 AI-powered conversational chatbot
- 📚 RAG (Retrieval-Augmented Generation) pipeline
- 📄 PDF document ingestion
- 🔍 Semantic search using vector embeddings
- ⚡ FastAPI REST API
- 🗂️ ChromaDB vector database
- 🔗 Easy backend integration

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Language | Python |
| Backend Framework | FastAPI |
| AI Framework | LangChain |
| LLM | OpenAI API |
| Vector Database | ChromaDB |
| Embedding Model | OpenAI Embeddings |
| Document Loader | PDF Loader |
| Testing | Postman |
| IDE | VS Code |
| Version Control | Git & GitHub |

---

# 📁 Project Structure

```text
ai-engineer/
│
├── .env
├── config.py
├── main.py
├── requirements.txt
├── README.md
│
├── data/
│   ├── BAUST_CSE.pdf
│   └── CSE-OBE-Syllabus.pdf
│
├── data_Load/
│   └── pdf_loader.py
│
├── embeddings/
│   └── embedding_model.py
│
├── fetchers/
│   └── api_fetcher.py
│
├── processors/
│   └── json_to_docs.py
│
├── rag/
│   ├── chunking.py
│   ├── generator.py
│   ├── pipeline.py
│   ├── prompt.py
│   └── retriever.py
│
├── scripts/
│   └── ingest_data.py
│
├── vectorstore/
│   └── chroma_store.py
│
├── chroma_db/
│
└── __pycache__/
```

---

# ⚙️ Installation

```bash
pip install -r requirements.txt
python -m scripts.ingest_data
uvicorn main:app --reload
# or
python main.py
```

---

# 🌐 API Endpoints

## GET /

Returns API status.

Example:

```json
{
  "message": "Smart Campus RAG API Running"
}
```

## POST /chat

Request:

```json
{
  "question": "Who teaches DBMS?"
}
```

Response:

```json
{
  "question": "Who teaches DBMS?",
  "answer": "Generated AI response",
  "retrieved_context": [
    "...relevant document chunks..."
  ]
}
```

---

# 💬 Example Questions

- When is the Software Engineering assignment due?
- Who teaches DBMS?
- What events are upcoming this week?
- What is the contact email for the CSE department?
- What courses are offered this semester?

---

# ✅ Deliverables

- Working **POST /chat** chatbot endpoint
- Handles **10+ FAQ categories**
- Integrated with the backend AI pipeline
- RAG-based document retrieval
- Clean and maintainable code structure
- ChromaDB vector storage integration
- API tested using **Postman**
- Comprehensive setup and usage documentation

---

# 🌿 Branch Naming

```bash
git checkout -b ai-engineer/chatbot-core
git checkout -b ai-engineer/rag-integration
```
