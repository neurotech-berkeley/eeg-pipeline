const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('eeg-stream', (msg) => {
        io.emit('eeg-stream-reply', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000');
});