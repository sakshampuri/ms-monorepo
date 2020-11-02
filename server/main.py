from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel,HttpUrl
app = FastAPI()

class Mood(BaseModel):
    name: str
    id: int
    images: List[Image]
    songs: List[Song]

class Song(BaseModel):
    song_url: HttpUrl
    song_id: int
    song_name: Optional[str] = None

class Image(BaseModel):
    image_url: HttpUrl
    image_id: int

@app.get("/")
def read_root():
    return {"Default": "Page"}

@app.put("/moods/{id}")
async def create_mood(id: int, mood: Mood):
    return {"id": id,"name":mood.name, **item.dict()}

@app.get("/moods/{id}")
def read_mood(id: int, name: Optional[str] = None):
    return {"id": id, "name": name}

@app.put("/songs/{song_id}")
async def add_song(song_id: int, song: Song,song_name: Optional[str] = None):
    return song.dict()
    
