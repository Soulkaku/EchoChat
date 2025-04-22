import io from "../../server.js";

io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    
    socket.on("verify-user", user => {
        const { username } = user;
        console.log(user); //verification log
        
        if( username == "") {
            const message = "Type a name!";
            socket.emit("reject-user", message);        
        } else { 
            socket.emit("pass-user", username);
        }
        //else if("name doesnt exist in data base");

    });
});