from data_Load.pdf_loader import load_pdfs
from fetchers.api_fetcher import (
    fetch_notices,
    fetch_routines,
    fetch_faculty
)
from processors.json_to_docs import (
    notices_to_docs,
    routines_to_docs,
    faculty_to_docs
)
from rag.chunking import split_documents
from embeddings.embedding_model import embedding_model
from vectorstore.chroma_store import collection

# Load PDFs
pdf_docs = load_pdfs()

# Fetch APIs
notices = fetch_notices()
routines = fetch_routines()
faculty = fetch_faculty()

# Convert JSON to documents
notice_docs = notices_to_docs(notices)
routine_docs = routines_to_docs(routines)
faculty_docs = faculty_to_docs(faculty)


# Combine all docs
all_docs = (
    pdf_docs +
    notice_docs +
    routine_docs +
    faculty_docs
)

# Chunk docs
chunks = split_documents(all_docs)

# Prepare for ChromaDB
texts = []
embeddings = []
metadatas = []
ids = []

for idx, chunk in enumerate(chunks):

    text = chunk.page_content

    embedding = embedding_model.encode(
        text
    ).tolist()

    texts.append(text)
    embeddings.append(embedding)
    metadatas.append(chunk.metadata)
    ids.append(f"doc_{idx}")


# Store in ChromaDB
collection.add(
    documents=texts,
    embeddings=embeddings,
    metadatas=metadatas,
    ids=ids
)

print("Data ingestion completed successfully.")

      
    
