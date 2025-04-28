import io from "../../server.js";

io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    let room;

    socket.on("enter-room", socketRoom => {
        room = socketRoom;
        socket.join(socketRoom);

    });

    
 
    socket.on("client-message", message => {
        const content = message.content;
        const roomMessage = message.room

        socket.to(room).emit("friend-message", content);
        console.log(content +  " " + room);
    });

});
