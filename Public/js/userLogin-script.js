
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
            
            const request = await fetch("/user/create", userPost);
            const response = await request.json();
        
        if(!response.ok) {
            console.error(response.errors);
            return;
        }
            console.log(response);
            sessionStorage.setItem("user-client", JSON.stringify(response));
        
            window.location.href = `/conversas?user=${user.name}`;
        } catch (error) {
            console.log("Log error: " + error);
            return;
        }       
    
        
    
});