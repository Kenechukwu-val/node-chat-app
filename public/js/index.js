var socket = io();

socket.on('connect', function () {
    console.log('User connected');
})

socket.on('disconnect', function () {
    console.log('user disconnected');
})

socket.on('newMsg', function (Msg) {
    console.log('New message', Msg);
})

socket.on('newUser', function (userMsg) {
    console.log('New User', userMsg);
})
