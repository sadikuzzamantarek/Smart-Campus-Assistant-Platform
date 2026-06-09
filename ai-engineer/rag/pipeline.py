from rag.retriever import retrieve_context
from rag.generator import generate_answer

def rag_pipeline(query):
    context = retrieve_context(query)
    answer = generate_answer(
        query,
        context
    )
    return {
        "answer": answer,
        "context": context
    }
