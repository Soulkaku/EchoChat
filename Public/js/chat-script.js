import { socket } from "./socket.js";

const userData = JSON.parse(sessionStorage.getItem("user-client"));
console.log(userData);

document.getElementById("username").textContent = userData.name;

const roomInput = document.getElementById("roomInput");
const sendRoom = document.getElementById("button-sendRoom");

let room;

sendRoom.addEventListener("click", (e) => {
    e.preventDefault();
    
    if(room != roomInput.value) {
        socket.emit("leave-room", room);
        room = "";
    }
    
    room = roomInput.value;
    socket.emit("enter-room", room);

    fetch(`/conversas/getMessages/${room}`).then(async (data) => {
        console.log(await data.json());
    });
});


const messageInput = document.getElementById("messageInput");
const sendMessage = document.getElementById("button-sendMessage");

sendMessage.addEventListener("click", (e) => {
    e.preventDefault();

    const message = {
        text: messageInput.value.trim(),
        room: room,
        user: userData
    }

    console.log(message);

    async function postMessage() {
        const reqBody = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(message)
        }

        const request = fetch("/conversas/postMessage", reqBody);
        request.then(async (response) => {
            console.log(await response.json());
        });
    }
    postMessage();
});
// //

// //SOCKETS INSTANCES
// //~
// socket.on("friend-message", (message) => {
//     createMessage(message, "friend-message");
// }); 


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