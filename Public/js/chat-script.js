import { socket } from "./socket.js";

const userData = JSON.parse(sessionStorage.getItem("user-client"));
console.log(userData);

document.getElementById("username").textContent = userData.name;

const roomInput = document.getElementById("roomInput");
const sendRoom = document.getElementById("button-sendRoom");

sendRoom.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(roomInput.value);

    socket.emit("leave-room", roomInput.value.trim());

    socket.emit("enter-room", roomInput.value.trim());

    fetch(`/conversas/getMessages/${roomInput.value.trim()}`).then(async (data) => {
        console.log( await data.json());
    });
});

const messageInput = document.getElementById("messageInput");
const sendMessage = document.getElementById("button-sendMessage");

const message = {
    text: messageInput.value.trim(),
    room: roomInput.value.trim(),
    user: userData
}

sendMessage.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(message);

    async function postMessage() {
        const reqBody = {
            method: "POST",
            Headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(message)
        }

        const request = await fetch("/conversas/postMessage", reqBody);
        // request.then(async (response) => {
        //     console.log(await response.json());
        // });
    }
    postMessage();
});
// //

// //SOCKETS INSTANCES
// //~
// socket.on("friend-message", (message) => {
//     createMessage(message, "friend-message");
// }); 


// //FUNCTIONS
// //~
// function createMessage(message, person) {
    
//     const messageDiv = document.createElement("div");
//             messageDiv.classList.add(person);

//     const messageP = document.createElement("p");
//             messageP.classList.add("message");
//             messageP.textContent = message.text;

//             messageDiv.appendChild(messageP);

//     document.getElementById("chat-message").appendChild(messageDiv);
// }