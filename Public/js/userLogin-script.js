
const usernameInput = document.getElementById("input-username");
const submitUser = document.getElementById("submit-button");

submitUser.addEventListener("click", async (e) => {
    e.preventDefault();

    if((usernameInput.value.trim()).length < 3) {
        alert("invalid name");
        usernameInput.textContent = "";
        return;
    }

    const user = {
        name: usernameInput.value.trim(),
    }

        try {

        const userPost = {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(user)
        }
            
            const response = await fetch("/user/create", userPost);
            const data = await response.json();

            console.log(data);
        
            sessionStorage.setItem("user-client", JSON.stringify(data));
        } catch (error) {
            console.log("Log error: " + error);
        }       
    
    window.location.href = `/conversas?user=${user.name}`;
    
});