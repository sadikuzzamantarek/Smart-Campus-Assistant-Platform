from langchain_core.documents import Document

# Convert notice data into LangChain Document
def notices_to_docs(notices):

    docs = []

    for item in notices:

        text = f"""
        Notice Title: {item.get('title', '')}

        Description:
        {item.get('description', '')}

        Department:
        {item.get('department', '')}
        """
        docs.append(
            Document(
                page_content=text,
                metadata={
                    "type": "notice"
                }
            )
        )

    return docs

# Convert routine data into LangChain Document
def routines_to_docs(routines):

    docs = []

    for item in routines:

        text = f"""
        Course {item.get('course_name', '')}
        is taught by {item.get('teacher', '')}
        in room {item.get('room', '')}
        at {item.get('time', '')}.
        """
        docs.append(
            Document(
                page_content=text,
                metadata={
                    "type": "routine"
                }
            )
        )

    return docs