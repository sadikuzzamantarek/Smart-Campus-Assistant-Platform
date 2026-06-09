from langchain_community.document_loaders import PyPDFLoader

def load_pdfs():
   
    # List of PDF files stored inside the data folder
    files =[
        "data\CSE-OBE-Syllabus.pdf",
        "data\BAUST_CSE.pdf"
        
    ]
     # Store all loaded documents
    docs = []
    for file in files:
        loader = PyPDFLoader(file)
        docs.extend(loader.load())
    return docs 