const Message = require('../models/messages');

const handleSocketConnection = (wss, ws) => {
  let username = null;

  ws.once('message', async (data) => {
    try {
      const parsed = JSON.parse(data);

      if (parsed.type === 'init' && parsed.username) {
        username = parsed.username;

        const history = await Message.find().sort({ timestamp: -1 }).limit(50).lean();
        ws.send(JSON.stringify({ type: 'history', messages: history.reverse() }));

        const joinNotice = JSON.stringify({
          type: 'system',
          message: `${username} has joined the chat`,
          timestamp: new Date().toISOString()
        });

        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN && client !== ws) {
            client.send(joinNotice);
          }
        });

        console.log(`🔔 ${username} has joined the chat`);

        ws.on('message', async (data) => {
          try {
            const msgData = JSON.parse(data);

            if (msgData.type === 'message' && msgData.message) {
              const newMsg = new Message({
                username,
                message: msgData.message
              });

              await newMsg.save();

              const broadcast = JSON.stringify({
                type: 'message',
                username,
                message: msgData.message,
                timestamp: newMsg.timestamp
              });

              wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                  client.send(broadcast);
                }
              });
            }
          } catch (err) {
            console.error("💥 Error handling message:", err.message);
          }
        });

        ws.on('close', () => {
          console.log(`❌ ${username} disconnected`);

          const leaveNotice = JSON.stringify({
            type: 'system',
            message: `${username} has left the chat`,
            timestamp: new Date().toISOString()
          });

          wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(leaveNotice);
            }
          });
        });
      }
    } catch (err) {
      console.error("💥 Init error:", err.message);
    }
  });
};

module.exports = handleSocketConnection;
