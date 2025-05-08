import { socket } from "./socket.js";

const user = JSON.parse(sessionStorage.getItem("user-client"));
console.log(user);

document.getElementById("username").textContent = user.name;

if(sessionStorage.getItem("restore-messages")) {
    const messages = JSON.parse(sessionStorage.getItem("room-messages"));

    pushMessages(messages);
}


const roomInput = document.getElementById("roomInput");
const sendRoom = document.getElementById("button-sendRoom");

let room;

sendRoom.addEventListener("click", () => {

    if(room != roomInput.value) {
        socket.emit("leave-room", room);
        room = "";
    }
    
    room = roomInput.value;
    socket.emit("enter-room", room);

    fetch(`/conversas/getMessages/${room}`).then(async (data) => {
        const messages = await data.json();

        sessionStorage.setItem("room-messages", JSON.stringify(messages));
        sessionStorage.setItem("restore-messages", true);

        location.reload();
    });
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
        });
    } catch (error) {
        console.error(`Create message ${error}`);
    }

});
// //

// //SOCKETS INSTANCES
// //~
// socket.on("friend-message", (message) => {
//     createMessage(message, "friend-message");
// }); 


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

function pushMessages(Arr) {
    
    for(let i = 0; i < Arr.length; i++) {
        if(Arr[i].user != user._id) {
            console.log(Arr[i]);
            return createMessage(Arr[i].text, "friend-message");
        } else {
            console.log(Arr[i]);
            return createMessage(Arr[i].text, "your-message");
        }
    }
}