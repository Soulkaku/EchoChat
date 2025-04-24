import { socket } from "./socket.js";

var clientUser = sessionStorage.getItem("userClient");

console.log(clientUser);

socket.on("client-user", username => {
    document.getElementById("username").textContent = username; 
});


