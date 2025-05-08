import { socket } from "./socket.js";

const user = JSON.parse(sessionStorage.getItem("user-client"));
console.log(user);

document.getElementById("username").textContent = user.name;

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

        // console.log(await data.json());

        for(let i = 0; i < messages.length; i++) {
            if(messages[i].user != user._id) {
                console.log(messages[i]);
                return createMessage(messages[i].text, "friend-message");
            } else {
                console.log(messages[i]);
                return createMessage(messages[i].text, "your-message");
            }
            
        }
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