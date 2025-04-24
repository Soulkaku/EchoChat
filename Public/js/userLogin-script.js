import { socket } from "./socket.js";

const submitButton = document.getElementById("submit-button");
const inputText = document.getElementById("input-username");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const user = { //subsituir por socket futuramente, para evitar falhas provocadas pelo cliente
        username: inputText.value.trim(), 
    }

    socket.emit("verify-user", user);

    socket.on("reject-user", message => {
        console.log(JSON.stringify(user));
        alert(message);
        return;
    });

    socket.on("pass-user", username => {
        alert("This is your name " + username);
    });

        console.log("alright");
            
        sessionStorage.setItem("userClient", user.username); //use o JSON.stringfy(user) futuramente
        window.location.href = `/conversas?user=${user.username}`;
});
