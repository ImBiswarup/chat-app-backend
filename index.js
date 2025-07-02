require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const connectToDB = require('./DB/connection');
const userRouter = require('./routes/user');
const handleSocketConnection = require('./websocket/socketHandler');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectToDB();


app.use('/api/user', userRouter);

wss.on('connection', (ws) => {
  console.log("🔌 Client connected");
  handleSocketConnection(wss, ws);
});
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
