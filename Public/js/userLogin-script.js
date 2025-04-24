
const usernameInput = document.getElementById("input-username");
const submitUser = document.getElementById("submit-button");

submitUser.addEventListener("click", (e) => {
    e.preventDefault();

    if((usernameInput.value.trim()).length < 3) {
        alert("invalid name");
        usernameInput.textContent = "";
        return;
    }

    const user = {
       "username" : usernameInput.value.trim()
    }

    console.log("log 1: " + JSON.stringify(user));

    sessionStorage.setItem("user-client", JSON.stringify(user));
    window.location.href = `/conversas?user=${user.username}`;
});