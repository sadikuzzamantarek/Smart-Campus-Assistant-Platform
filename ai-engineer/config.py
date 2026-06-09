from dotenv import load_dotenv
import os

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
BASE_API_URL = os.getenv("BASE_API_URL")