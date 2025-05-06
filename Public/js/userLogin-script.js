
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

    async function createUser() {

        const userPost = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(user)
        }

        try {
            const response = await fetch("/user/create", userPost);
            const data = await response.json();

            user.id = data._id;
            // window.location.href = `/conversas?user=${user.name}`;
        } catch (error) {
            console.log("Log error: " + error);
        }       
    }

    console.log(user)
    sessionStorage.setItem("user-client", JSON.stringify(user));
    createUser();
});