import { socket } from "./socket.js";

const userData = JSON.parse(sessionStorage.getItem("user-client"));
console.log(userData);

const nameBox = document.getElementById("username").textContent = userData.username;

const messageInput = document.getElementById("messageInput");
const sendMessage = document.getElementById("button-sendMessage");

//EVENT LISTENERS
// ~
sendMessage.addEventListener("click", (event) => {
    event.preventDefault();

    const message = {
        text: messageInput.value.trim(),
        user: userData.username,
        room: room
    }

    if(message.text == "") {
        alert("message is undefined");
        return;
    }

    socket.emit("client-message", message);

    createMessage(message, "your-message");
    messageInput.value = "";
});


const roomInput = document.getElementById("roomInput");
const sendRoom = document.getElementById("button-sendRoom");

    var room;

sendRoom.addEventListener("click", (event) => {
    event.preventDefault();

    if(room != roomInput.value.trim()) {
        socket.emit("leave-room", room);
        room = "";
    } 

    room = roomInput.value.trim();

    

    socket.emit("enter-room", room);
});
//

//SOCKETS INSTANCES
//~
socket.on("friend-message", (message) => {
    createMessage(message, "friend-message");
}); 


//FUNCTIONS
//~
function createMessage(message, person) {
    
    const messageDiv = document.createElement("div");
            messageDiv.classList.add(person);

    const messageP = document.createElement("p");
            messageP.classList.add("message");
            messageP.textContent = message.text;

            messageDiv.appendChild(messageP);

    document.getElementById("chat-message").appendChild(messageDiv);
}