from openai import OpenAI
import os
from dotenv import load_dotenv

from rag.prompt import PROMPT_TEMPLATE

load_dotenv()

token = os.getenv("GITHUB_TOKEN")

client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=token,
)

MODEL_NAME = "gpt-4o-mini"


def generate_answer(question, context):

    prompt = PROMPT_TEMPLATE.format(
        context=context,
        question=question
    )

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You are a BAUST smart campus assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=500
    )

    return response.choices[0].message.content