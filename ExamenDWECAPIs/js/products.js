const btnCrear = document.getElementById("btnCreate");

btnCrear.addEventListener("click", async (event) => {
  event.preventDefault();
  const user = await fetch(
    `http://localhost:3000/users/${localStorage.getItem("token")["x-autentication"]}`,
  );
  await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        user: {
          id: user._id,
          name: user.name,
          date: new Date(Date.now()),
        },
      },
    ]),
  });
});
