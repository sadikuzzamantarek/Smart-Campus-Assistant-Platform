import requests
from config import BASE_API_URL


# Fetch all notices from the API
def fetch_notices():
    response = requests.get(
        f"{BASE_API_URL}/api/notices"
    )
    return response.json()


# Fetch all class routines from the API
def fetch_routines():
    response = requests.get(
        f"{BASE_API_URL}/api/routines"
    )
    return response.json()