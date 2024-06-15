// Packages
import express from 'express';
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'

// Configurations
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

// middleware
app.use(cors())

// socket.io stuff
io.on('connection', (socket) => {
    console.log('New Client connected')

    socket.on('message', (message) => {
        console.log('Message received: ', message)
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

// Run the server
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})