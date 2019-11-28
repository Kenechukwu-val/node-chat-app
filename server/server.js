const path = require('path');

const http = require('http');

const express = require('express');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public/');

const port = process.env.PORT || 3000;

const app = express();

//creates a middleware to server files from with a given root directory.
app.use(express.static(publicPath));

const server = http.createServer(app);

const io = socketIO(server);

//lets you register an event
io.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
