const path = require('path');

const http = require('http');

const express = require('express');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public/');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

const app = express();

//creates a middleware to server files from with a given root directory.
app.use(express.static(publicPath));

const server = http.createServer(app);

const io = socketIO(server);

//lets you register an event
io.on('connection', (socket) => {
    console.log("New user connected");

    
    socket.emit('newMsg', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMsg', generateMessage('Users', 'New user joined'));

    socket.on('createMsg', (message) => {
        console.log('createMsg', message)
        //Makes the message sent visible to everyone connected to the server
        io.emit('newMsg', generateMessage(message.from, message.text));

        //sends a message to all connected user but doesn't receive the msg
        // socket.broadcast.emit('newMsg', {
        //     from: message.from,
        //     text: message.text,
        //     createdAT: new Date().getTime()
        // })


    })

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
