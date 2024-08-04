function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission
  const formData = new FormData(event.target);
  const name = formData.get("name");
  const password = formData.get("password");

  const msgContainer = document.getElementById("greetingMessage");

  msgContainer.innerHTML = "";

  //sending data to server...
  fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      if (data.success) {
        const msg = document.createElement("p");

        msg.textContent = "User created!";

        msg.classList.add( "success");

        msgContainer.style.opacity = 1;
        msgContainer.appendChild(msg);
        setTimeout(()=>{
          msgContainer.style.opacity = 0;
        },3000)

      } else {
        const msg = document.createElement("p");

        msg.textContent = data.error;

        msg.classList.add( "error");

        msgContainer.style.opacity = 1;
        msgContainer.appendChild(msg);

        setTimeout(()=>{
          msgContainer.style.opacity = 0;
        },3000)
      }
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}
