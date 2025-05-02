import io from "../server.js";

io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.on("enter-room", (room) => {
        socket.join(room);
    });

    socket.on("leave-room", (room) => {
        socket.leave(room);
        console.log(socket.id + " has leave the room " + room);
    });

    socket.on("client-message", (message) => {
        const room = message.room;
            
        socket.to(room).emit("friend-message", message);
    });
});

