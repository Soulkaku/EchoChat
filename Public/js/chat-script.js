import { socket } from "./socket.js";


const user = JSON.parse(sessionStorage.getItem("user-client"));
console.log(user);

document.getElementById("username").textContent = user.username;

const sendMessage = document.getElementById("button-sendMessage");

sendMessage.addEventListener("click", (e) => {
    e.preventDefault();

   const getMessage = document.getElementById("messagePost");
   
   if(getMessage == "") {
    alert("message is undefined");
    return;
   }

   let room = defineRoom();

   const message = {
    content : getMessage.value.trim(),
    room : room
   }

   createMessage(message.content, "your-message");

   getMessage.textContent = "";

   socket.emit("client-message", message);

});


function createMessage(content, person) {
    var messageDiv = document.createElement("div");
    messageDiv.classList.add(person);

    var message = document.createElement("p");
    message.classList.add("message");
    message.textContent = content;

    messageDiv.appendChild(message);

    document.getElementById("chat-message").appendChild(messageDiv);
}

function defineRoom() {
    const submitRoom = document.getElementById("define-room");

    submitRoom.addEventListener("click", (e) => {
        e.preventDefault();

        const defineRoom = document.getElementById("roomInput");
        const room = defineRoom.value.trim();
        

        if(room == "") {
           return alert("log 2: undefined");
        }
    });
}