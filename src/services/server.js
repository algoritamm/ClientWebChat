const WebSocket = require('ws');

const PORT = 8000;
const wss = new WebSocket.Server({ port: PORT, host: '0.0.0.0' });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

wss.on('connection', function connection(ws) {
    console.log("New client connected");

    ws.on('message', function incoming(data) {

        let parsed;
        try {
            parsed = JSON.parse(data);
            console.log("Received: ", parsed.message, " ", "id", " ", parsed.id);
        } catch (e) {
            console.error("Invalid JSON received:", data);
            return;
        }

        // Broadcast JSON string
        const json = JSON.stringify(parsed);

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});