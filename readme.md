# 🛠 Backend – Real-Time Chat App

This is the backend server for the Real-Time Chat App, built using **Node.js**, **Express**, **WebSocket (`ws`)**, and **MongoDB**. It supports real-time messaging, persistent chat history, and optional user authentication.

---

## 📦 Tech Stack

- **Node.js + Express** – HTTP server and REST API
- **WebSocket (`ws`)** – Real-time bidirectional communication
- **MongoDB + Mongoose** – Database and ORM
- **dotenv** – Environment variable management

---

## 📁 Project Structure

```
/backend
├── models/
│ ├── message.js
│ └── users.js
├── routes/
│ └── userRoutes.js
├── websocket/
│ └── socket.js
├── DB/
│ └── db.js
├── server.js
└── .env
```


---

## 🔧 Setup Instructions

## Clone the Repository

``` 
git clone https://github.com/your-username/chat-app.git
cd chat-app/backend
```


# Install Dependencies

```
npm install
```

# Set Environment Variables
Create a .env file in /backend with the following:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chat-app
```

Ensure MongoDB is running locally or use a remote connection string (e.g., MongoDB Atlas).

# Start the Server
```
npm start
```

WebSocket Overview
The backend uses the ws library for WebSocket support.

🔄
```init```	
Sent by client to register username
```message```	
Sent by client to broadcast a chat message
```history```
Sent by server with recent 50 chat messages
```system```
	Sent by server when a user joins the chat

API Endpoints
Optional user registration and login functionality:

POST	```/api/user/register```	Register a new user

POST	```/api/user/login```	Login with credentials

GET	```/api/user/:userId```	Get user by ID

Example

```
POST /api/user/register
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}

```

# Concurrency & Architecture
- WebSocket connections are tracked in memory

- When a client connects:

    - Server broadcasts a "user joined" message

    - Loads and sends the last 50 messages from DB

- When a message is received:

    - It's saved to MongoDB

    - Then broadcast to all connected clients

# Assumptions & Design Decisions
- No authentication tokens/session handling (simple demo scope)

- Message storage capped to recent history (50 messages)

- Error responses follow consistent JSON structure


# Deployment Notes
You can deploy the backend on:

- Render, Railway, Heroku, or VPS

- Ensure the .env variables (MONGODB_URI, PORT) are set correctly

- Serve frontend separately (e.g., Vercel/Netlify)

# If deploying WebSocket behind HTTPS, make sure to use the wss:// protocol.

# Dependencies

```
npm install express ws mongoose cors dotenv
```

Development Summary
```
# Start MongoDB
mongod

# Start server
cd backend
npm install
npm start
```
