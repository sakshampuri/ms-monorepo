from API.models import Song
from API.moods_data import song_data

from fastapi import Header, APIRouter

playlist = APIRouter()

@playlist.get('/{id}')
async def servePlaylist(id: int):
    return [data for data in song_data if data['moodId'] == id]
