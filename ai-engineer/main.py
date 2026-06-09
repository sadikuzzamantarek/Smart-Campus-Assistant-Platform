from fastapi import FastAPI
from pydantic import BaseModel

from rag.pipeline import rag_pipeline

app = FastAPI()

class ChatRequest(BaseModel):
    question: str

@app.get("/")
def home():
    return {
        "message": "Smart Campus RAG API Running"
    }

@app.post("/chat")
def chat(request: ChatRequest):

    result = rag_pipeline(
        request.question
    )

    return {
        "question": request.question,
        "answer": result["answer"],
        "retrieved_context": result["context"]
    }