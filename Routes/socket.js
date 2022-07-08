const users = require("./getUsers");

function socket(io) {
    io.on("connection", socket => {
        socket.on("new-user-joined", name => {
            users[socket.id] = name;
            socket.broadcast.emit("user-joined", name);
        })

        socket.on("send", message => {
            socket.broadcast.emit("receive", { message: message, name: users[socket.id] });
        })

        socket.on("disconnect", message => {
            socket.broadcast.emit("left", users[socket.id]);
            delete users[socket.id];
        })
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId)
            socket.to(roomId).emit('user-connected', userId);
            // messages
            socket.on('message', (message) => {
                //send message to the same room
                io.to(roomId).emit('createMessage', message)
            });

            socket.on('disconnect', () => {
                socket.to(roomId).emit('user-disconnected', userId)
            })
        })
    })
}

module.exports = socket;