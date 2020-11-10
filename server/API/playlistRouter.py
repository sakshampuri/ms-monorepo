from API.models import Song
from API.moods_data import song_data

from fastapi import Header, APIRouter
from fastapi.responses import StreamingResponse
import os

playlist = APIRouter()


@playlist.get('/{id}')
async def servePlaylist(id: int):
    return [data for data in song_data if data['mId'] == id]


@playlist.get('/{moodId}/stream/{songId}')
async def serveSong(moodId: int, songId: int):
    songs=[data for data in song_data if data['mId'] == moodId]
    for data in songs:
        if data['id']==songId:
            name=data['title']
    name=name+".mp3"
    song_path=os.path.dirname(os.path.realpath(name))
    song = open(song_path, mode='rb')
    return StreamingResponse(song, media_type='audio/mp3')
