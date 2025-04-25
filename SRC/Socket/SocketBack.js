import io from "../../server.js";

io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.on("client-message", (content, room) => {
        if(content != "") {
            socket.to(room).emit("friend-message", content);
        }
    });
});
