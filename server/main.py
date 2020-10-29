from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class Mood(BaseModel):
    name: str
    id: int

@app.get("/")
def read_root():
    return {"Default": "Page"}

@app.get("/moods/{id}")
def read_mood(id: int, name: Optional[str] = None):
    return {"id": id, "name": name}

@app.put("/moods/{id}")
def update_mood(id: int, mood: Mood):
    return {"name": mood.name, "id": id}