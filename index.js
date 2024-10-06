// server.js

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Initialize an Express app
const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Create an HTTP server and pass it to socket.io
const server = createServer(app);
const io = new Server(server); // Initialize socket.io

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom events
    socket.on('message', (data) => {
        console.log('Message received: ', data);
        // Broadcast the message to all clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
