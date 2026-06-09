from openai import OpenAI
import os
from dotenv import load_dotenv

from rag.prompt import PROMPT_TEMPLATE

# Load environment variables from .env file
load_dotenv()

token = os.getenv("GITHUB_TOKEN")

# Initialize OpenAI client using GitHub Models endpoint
client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=token,
)


# Model used for answer generation
MODEL_NAME = "gpt-4o-mini"

# Generate an answer using retrieved context and user question
def generate_answer(question, context):

    prompt = PROMPT_TEMPLATE.format(
        context=context,
        question=question
    )

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                # Define assistant behavior
                "role": "system",
                "content": "You are a BAUST smart campus assistant."
            },
            {
                # Provide the RAG prompt containing context and question
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=500  # Maximum response length
    )

    return response.choices[0].message.content