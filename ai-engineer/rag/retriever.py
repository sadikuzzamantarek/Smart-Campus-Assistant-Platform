from vectorstore.chroma_store import collection
from embeddings.embedding_model import embedding_model

# Retrieve relevant context from the vector database
def retrieve_context(query, top_k=3):

    query_embedding = embedding_model.encode(
        query
    ).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
    # Extract the retrieved document contents
    documents = results["documents"][0]

    return "\n".join(documents)