require('dotenv').config() //When you install first column dependies

// --------------- Packages speicifi stuffs ----------------------X
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/api/config/db'); // Make sure to require your database connection

const http = require('http');
const socketIo = require('socket.io');

connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());


const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend URL
        methods: ['GET', 'POST','PUT'],
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.set('io', io);


//When use your app any json object or form fill up
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Setup our routes dependence of versions
if (process.env.VERSION == 'v1') {
    console.log('v1')

   
}

app.get('/*', (req, res) => {
    return res.status(201).json({ success: true, msg: "Welcome in real time flight notification system updation" })
})


io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

