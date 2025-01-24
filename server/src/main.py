from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import asyncio
app = FastAPI()

# Allow CORS for your frontend (React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Room Manager
class ConnectionManager:
    def __init__(self):
        self.rooms: Dict[str, List[WebSocket]] = {}  # A dictionary mapping room names to WebSocket connections

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.rooms:
            self.rooms[room] = []
        self.rooms[room].append(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.rooms:
            self.rooms[room].remove(websocket)
            if not self.rooms[room]:  # Remove empty rooms
                del self.rooms[room]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast_to_room(self, message: str, room: str, sender: WebSocket):
        if room in self.rooms:
            for connection in self.rooms[room]:
                if connection != sender:
                    await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{room}")
async def websocket_endpoint(websocket: WebSocket, room: str):
    await manager.connect(websocket, room)
    try:
        # Welcome the user to the room
        await manager.send_personal_message(f"Welcome to room: {room}", websocket)
        while True:
            data = await websocket.receive_text()
            print(f"Message from {room}: {data}")
            asyncio.sleep(1)

            if room == "bot_room":
                # Bot room: Bot responds with the message the user sent
                bot_response = f"Your message was: {data}"
                await manager.send_personal_message(bot_response, websocket)
            elif room == "broadcast":
                # Broadcast room: Broadcast the message to all other users
                broadcast_message = f"{data}"
                await manager.broadcast_to_room(broadcast_message, room, websocket)

    except WebSocketDisconnect:
        manager.disconnect(websocket, room)
        print(f"Client disconnected from room: {room}")
