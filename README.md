# MedicalSockets
# Medical Chatbot Sockets

## Project Description

The **Medical Chatbot Sockets** project enables users to join a chat room and interact with either other users or a bot. The project leverages WebSockets to provide real-time messaging, where users can either participate in a **Broadcast Room** to chat with multiple users or a **Bot Room** to interact with a bot.

## Setup Instructions

1. **Clone the Repository:**

   Start by cloning the project to your local machine:

   ```bash
   git clone https://github.com/hamza9-bit/MedicalSockets.git
2. **Install Dependencies**
Install Dependencies
Backend (FastAPI with Python)
Navigate to the server directory:
cd server
Set up a virtual environment:
python -m venv venv
Activate the virtual environment:
.\venv\Scripts\activate
Install the required dependencies:


pip install -r requirements.txt
Start the backend server using uvicorn:
uvicorn src.main:app --host 0.0.0.0 --port 8000
The FastAPI backend server will now be running on http://localhost:8000.

Frontend (React)
Navigate to the frontend directory:


cd ../frontend
Install the necessary dependencies:

npm install
Start the React development server:

npm start
The React frontend will now be running on http://localhost:3000.

How to Run the Project Using Docker
If you prefer to use Docker to run the project, follow these steps:

1. Build and Run Docker Containers Using Docker Compose
The project is configured to run both the frontend and backend services using Docker and Docker Compose. In the root directory of the project (where docker-compose.yml is located), run:
bash
Copy
Edit
docker-compose up --build
This command will:

Build the Docker images for the frontend and backend services.
Start both services in separate containers.
By default, the frontend will be accessible at http://localhost:3000 and the backend at http://localhost:8000.

Stop the Application
To stop the containers, run:
docker-compose down


