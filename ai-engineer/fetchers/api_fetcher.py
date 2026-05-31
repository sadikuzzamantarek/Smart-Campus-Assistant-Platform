import requests
from config import BASE_API_URL


def fetch_notices():
    response = requests.get(
        f"{BASE_API_URL}/api/notices"
    )
    return response.json()

def fetch_routines():
    response = requests.get(
        f"{BASE_API_URL}/api/routines"
    )
    return response.json()


def fetch_faculty():
    response = requests.get(
        f"{BASE_API_URL}/api/faculty"
    )
    return response.json()