class Facade {
  constructor() {}
  async cargarPets() {
    const template = document.getElementById("templatePets");
    const section = document.getElementById("listaPets");
    const pets = await fetch(`http://localhost:4367/pets`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
    section.querySelectorAll(".cardPet").forEach((n) => n.remove());
    pets.forEach((pet) => {
      const clone = template.content.firstElementChild.cloneNode(true);

      const name = clone.querySelector("#namePet");
      const race = clone.querySelector("#race");
      const age = clone.querySelector("#age");
      const owner = clone.querySelector("#owner");
      const state = clone.querySelector("#state");
      const photo = clone.querySelector("#imgPet");

      photo.addEventListener("click", () => this.irAMods("consultar", pet._id));

      clone
        .querySelector("#btnCerrarPet")
        .addEventListener("click", async (event) => {
          await fetch(`http://localhost:4367/pets/${pet._id}`, {
            method: "DELETE",
          }).catch((error) => {
            console.log(error);
          });
          this.cargarPets();
        });
      clone
        .querySelector("#btnEditarPet")
        .addEventListener("click", () => this.irAMods("editar", pet._id));
      clone.id = pet._id;
      name.textContent = pet.name;
      race.textContent = pet.race;
      age.textContent = pet.age;
      owner.textContent = pet.owner;
      state.textContent = pet.state;
      photo.src = pet.photo;
      photo.alt = pet.name;

      switch (pet.state) {
        case "Available":
          clone.style.backgroundColor = "lightgreen";
          break;
        case "Pending":
          clone.style.backgroundColor = "khaki";
          break;
        case "Sold":
          clone.style.backgroundColor = "lightcoral";
          break;
        default:
          clone.style.backgroundColor = "white";
      }

      section.appendChild(clone);
    });
  }
  irAMods(estado, id = "") {
    const params = new URLSearchParams();

    params.set("estado", estado);

    if (id) params.set("id", id);

    location.href = `./mods.html?${params.toString()}`;
  }

  cargarEdicion(id) {
    this.cargarDatos(id);
  }
  cargarObservacion(id) {
    const form = document.getElementById("formPet");
    form.querySelectorAll("input, select, textarea, button").forEach((el) => {
      el.disabled = true;
    });
    this.cargarDatos(id);
  }
  async cargarDatos(id) {
    const photo = document.getElementById("imgPet");
    const name = document.getElementById("inputNombre");
    const race = document.getElementById("inputRace");
    const age = document.getElementById("inputAge");
    const state = document.getElementById("selectState");
    const owner = document.getElementById("inputOwner");

    const pet = await fetch(`http://localhost:4367/pets/${id}`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    name.value = pet.name;
    race.value = pet.race;
    age.value = pet.age;
    owner.value = pet.owner;
    state.value = pet.state;
    photo.src = pet.photo;
    photo.alt = pet.name;

    photo.addEventListener("click", (event) => {});
  }
}
export { Facade };
