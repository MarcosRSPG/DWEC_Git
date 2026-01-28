const btnLogin = document.getElementById("btnLogin");
const inputUser = document.getElementById("name");
const inputPassword = document.getElementById("password");

btnLogin.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputUser.value,
      password: inputPassword.value,
    }),
  });
  if (response.status === 200) {
    if (response.admin) {
      localStorage.setItem("token", {
        "x-autentication": response._id,
        "x-admin": response.admin,
      });
      location.href = `./admin.html`;
    } else {
      localStorage.setItem("token", {
        "x-autentication": response._id,
        "x-admin": response.admin,
      });
      location.href = `./productos.html`;
    }
  }
});
