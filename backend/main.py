from fastapi import FastAPI
from websocket_routes import router as websocket_router

app = FastAPI()

app.include_router(websocket_router)
