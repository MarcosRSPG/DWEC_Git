const btnLog = document.getElementById("submit");

btnLog.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("http://localhost:4367/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: document.getElementById("inputUsuario"),
      password: document.getElementById("inputPassword"),
    },
  }).catch((error) => {
    console.log(error);
  });
  if (response.status === 200) {
    location.href = `./landing.html`;
  } else {
    if (response.status === 404) {
      await fetch("http://localhost:4367/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: document.getElementById("inputUsuario"),
          password: document.getElementById("inputPassword"),
        },
      }).catch((error) => {
        console.log(error);
      });
      location.href = `./landing.html`;
    }
  }
});
