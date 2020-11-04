from API.models import Mood
from API.moods_data import mood_data
from API.playlistRouter import playlist

from typing import List
from fastapi import Header, APIRouter

# Initialising the API Router - moods
moods = APIRouter()


@moods.get('/', response_model=List[Mood])
async def index():
    return mood_data

moods.include_router(playlist)
