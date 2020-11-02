from typing import Optional,List
from pydantic import HttpUrl, BaseModel

# Main model to serve the home screen to the client consisting of the current moods
class Mood(BaseModel):
    id: int
    title: str
    author: str
    authorImage: HttpUrl
    description: str
    duration: int

class Song(BaseModel):
    id: int
    title: str
    artist: str
    album: str
    albumArt: HttpUrl
    duration: Optional[int]

class Image(BaseModel):
    image_url: HttpUrl
    image_id: int

