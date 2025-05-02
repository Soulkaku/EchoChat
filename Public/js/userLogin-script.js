
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
        name: usernameInput.value.trim(),
    }

    const userPost = {
       method: "POST",
       headers: { "Content-Type" : "application/json" },
       body: JSON.stringify(user)
    }

    fetch('/user/create', userPost).then(() => {
        console.log("log 1: " + JSON.stringify(user));

        // sessionStorage.setItem("user-client", JSON.stringify(user));
        // window.location.href = `/conversas?user=${user.username}`;
    });


});