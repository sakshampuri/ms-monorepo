from fastapi import FastAPI

# Importing the Routers here
from API.moods import moods

app = FastAPI()

app.include_router(moods, prefix='/moods')

