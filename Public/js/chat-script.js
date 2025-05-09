import { socket } from "./socket.js";

const user = JSON.parse(sessionStorage.getItem("user-client"));
console.log(user);

document.getElementById("username").textContent = user.name;

let room;

if(sessionStorage.getItem("restore-messages")) {
    room = sessionStorage.getItem("room");

    socket.emit("enter-room", room);

    fetch(`/conversas/getMessages/${room}`).then(async (data) => {
        const messages = await data.json();

        for(let i = 0; i < messages.length; i++) {
            console.log(messages);
            if((messages[i].user).trim() != (user._id).trim()) {
                createMessage(messages[i].text, "friend-message");
            } else {
                createMessage(messages[i].text, "your-message");
            }
        }
    });
}

const roomInput = document.getElementById("roomInput");
const sendRoom = document.getElementById("button-sendRoom");

sendRoom.addEventListener("click", () => {

    if(room != roomInput.value) {
        socket.emit("leave-room", room);
        room = "";
    }
    
    room = roomInput.value;

    sessionStorage.setItem("room", room);
    sessionStorage.setItem("restore-messages", true);

    location.reload();
});


const messageInput = document.getElementById("messageInput");
const sendMessage = document.getElementById("button-sendMessage");

sendMessage.addEventListener("click", async (e) => {
    e.preventDefault();

    const message = {
        text: messageInput.value.trim(),
        room: room,
        user: user
    }

    console.log(message);

    try {
        const reqBody = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(message)
        }

        const request = fetch("/conversas/createMessage", reqBody);
        request.then(async (response) => {
            console.log(await response.json());
            messageInput.value = "";
        });

    } catch (error) {
        console.error(`Create message ${error}`);
    }

});


//SOCKETS
//~
socket.on("create-message", (message) => {
    if((message.user).trim() != (user._id).trim()) {
        createMessage(message.text, "friend-message");
    } else {
        createMessage(message.text, "your-message");
    }
}); 


//FUNCTIONS
//~
function createMessage(text, person) {
    
    const messageDiv = document.createElement("div");
            messageDiv.classList.add(person);

    const messageP = document.createElement("p");
            messageP.classList.add("message");
            messageP.textContent = text;

            messageDiv.appendChild(messageP);

    document.getElementById("chat-message").appendChild(messageDiv);
}