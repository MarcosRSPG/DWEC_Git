import { Facade } from "./ui/Facade.js";

const facade = new Facade();

const params = new URLSearchParams(window.location.search);

const estado = params.get("estado");

if (estado !== null) {
  const photo = document.getElementById("imgPet");
  const name = document.getElementById("inputNombre");
  const race = document.getElementById("inputRace");
  const age = document.getElementById("inputAge");
  const state = document.getElementById("selectState");
  const owner = document.getElementById("inputOwner");
  switch (estado) {
    case "editar":
      facade.cargarEdicion(params.get("id"));
      document
        .getElementById("submit")
        .addEventListener("click", async (event) => {
          event.preventDefault();
          await fetch(`http://localhost:4367/pets/${params.get("id")}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              owner: owner.value,
              race: race.value,
              age: age.value,
              state: state.value,
              photo: photo.src,
            }),
          });
          location.href = `./landing.html`;
        });

      break;
    case "crear":
      document
        .getElementById("submit")
        .addEventListener("click", async (event) => {
          event.preventDefault();
          await fetch("http://localhost:4367/pets/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([
              {
                name: name.value,
                owner: owner.value,
                race: race.value,
                age: age.value,
                state: state.value,
                photo: photo.src,
              },
            ]),
          });
          location.href = `./landing.html`;
        });
      break;
    case "consultar":
      facade.cargarObservacion(params.get("id"));
      break;
  }
} else {
  facade.cargarPets();
  const btnCrear = document.getElementById("crearPet");
  btnCrear.addEventListener("click", () => facade.irAMods("crear"));
}
