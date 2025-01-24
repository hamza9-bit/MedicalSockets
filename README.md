# MedicalSockets

## Project Description

The **Medical Chatbot Sockets** project enables users to join a chat room and interact with either other users or a bot. This application uses WebSockets to provide real-time messaging, allowing users to participate in either:

- **Broadcast Room**: A chat room for interacting with multiple users.
- **Bot Room**: A dedicated room to interact with a bot.

## Setup Instructions

### Prerequisites

- [Python](https://www.python.org/downloads/) (3.7 or higher)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (if using Docker)
- Git

### Step-by-Step Guide

#### 1. Clone the Repository

Start by cloning the project to your local machine:

```bash
git clone https://github.com/hamza9-bit/MedicalSockets.git
```

#### 2. Install Dependencies

##### Backend (FastAPI with Python)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Set up a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the backend server using Uvicorn:
   ```bash
   uvicorn src.main:app --host 0.0.0.0 --port 8000
   ```
   The FastAPI backend server will now be running on [http://localhost:8000](http://localhost:8000).

##### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The React frontend will now be running on [http://localhost:3000](http://localhost:3000).

### How to Run the Project Using Docker

If you prefer to use Docker to run the project, follow these steps:

#### 1. Build and Run Docker Containers Using Docker Compose

The project is configured to run both the frontend and backend services using Docker and Docker Compose. In the root directory of the project (where `docker-compose.yml` is located), run:

```bash
docker-compose up --build
```

This command will:

- Build the Docker images for the frontend and backend services.
- Start both services in separate containers.

By default:

- The frontend will be accessible at [http://localhost:3000](http://localhost:3000).
- The backend will be accessible at [http://localhost:8000](http://localhost:8000).

#### 2. Stop the Application

To stop the containers, run:

```bash
docker-compose down
```

