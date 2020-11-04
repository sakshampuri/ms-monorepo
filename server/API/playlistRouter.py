from API.models import Song
from API.moods_data import song_data

from fastapi import Header, APIRouter
from fastapi.responses import StreamingResponse


playlist = APIRouter()

song = open(
    '/Users/sakshampuri/dev/College/ms-monorepo/server/API/data/LLizard.mp3', mode='rb')


@playlist.get('/{id}')
async def servePlaylist(id: int):
    return [data for data in song_data if data['moodId'] == id]


@playlist.get('/{moodId}/stream/{songId}')
async def serveSong(moodId: int, songId: int):
    return StreamingResponse(song, media_type='audio/mp3')
