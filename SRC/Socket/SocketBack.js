import io from "../../server.js";

io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.on("client-message", message => {
        var content = message.content
        var room = message.room

        socket.to(room).emit("friend-message", content);
        
    });
});
