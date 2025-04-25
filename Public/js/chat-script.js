import { socket } from "./socket.js";


const user = JSON.parse(sessionStorage.getItem("user-client"));
console.log(user);

let room;

document.getElementById("username").textContent = user.username;

const sendMessage = document.getElementById("button-sendMessage");

socket.on("friend-message", messageContent => {
    createMessage(messageContent, "friend-message");
});

sendMessage.addEventListener("click", (e) => {
    e.preventDefault();

   const getMessage = document.getElementById("messagePost");
    if(getMessage == "") {
        alert("message is undefined");
        return;
    }

    const message = {
        content : getMessage.value.trim(),
        room : ""
    }

   createMessage(message.content, "your-message");

   getMessage.textContent = "";

   socket.emit("client-message", message);

});

document.getElementById("define-room").addEventListener("click", (e) => {
    e.preventDefault();

    return defineRoom();
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
    const roomInput = document.getElementById("roomInput");
    room = roomInput.value.trim();

    roomInput.textContent = "null";
    console.log("log 2: function defineRoom");
}

// function defineRoom() {
//     const submitRoom = document.getElementById("define-room");

//     submitRoom.addEventListener("click", (e) => {
//         e.preventDefault();

//         const defineRoom = document.getElementById("roomInput");
//         const room = defineRoom.value.trim();
        

//         if(room == "") {
//            alert("log 2: undefined");
//         }

//         alert("log 3: yes")
//     });
// }