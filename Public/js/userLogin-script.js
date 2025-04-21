import { socket } from "./socket.js";


const submitButton = document.getElementById("submit-button");
const inputText = document.getElementById("input-username");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const user = { //subsituir por socket futuramente, para evitar falhas provocadas pelo cliente
        username: inputText.value, 
    }

    console.log(JSON.stringify(user));
    console.log("alright");

    sessionStorage.setItem("userClient", user);
});