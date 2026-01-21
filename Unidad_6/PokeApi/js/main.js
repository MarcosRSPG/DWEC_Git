import { Facade } from "./ui/Facade.js";

const facade = new Facade();

const btnBattle = document.getElementById("btnBattle");
const btnTeam = document.getElementById("btnTeam");
const btnAtacar = document.getElementById("btnAtacar");
const btnEscapar = document.getElementById("btnEscapar");
const btnCapturar = document.getElementById("btnCapturar");

facade.cambiarDisplay("sectionBattle");
facade.generarPokemon();
facade.cargarEquipo();

btnBattle.addEventListener("click", (event) => {
  event.preventDefault();
  facade.cambiarDisplay("sectionBattle");
  facade.generarPokemon();
});
btnAtacar.addEventListener("click", (event) => {
  facade.quitarVida("pokemon");
  pasarTurno();
});
btnTeam.addEventListener("click", (event) => {
  event.preventDefault();
  facade.cargarEquipo();
  facade.cambiarDisplay("sectionTeam");
});

btnEscapar.addEventListener("click", (event) => {
  facade.generarPokemon();
  facade.vidaYo += 200;
});
btnCapturar.addEventListener("click", (event) => {
  intentarCapturar();
});
function pasarTurno() {
  if (facade.pokemonSelected.health <= 0) {
    location.reload();
  }

  facade.quitarVida("yo");
  comprobarMuerte();
}
function comprobarMuerte() {
  if (facade.vidaYo <= 0) {
    location.reload();
  }
}
async function intentarCapturar() {
  let probabilidades = facade.hpDOMPokemon.getAttribute("value");
  if (Math.random() * 100 >= probabilidades) {
    await fetch(`http://localhost:6968/equipo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arrayPokemons: [
          {
            name: facade.pokemonSelected.name,
            url: `https://pokeapi.co/api/v2/pokemon/${facade.pokemonSelected.name}`,
            damage: facade.pokemonSelected.damage,
            health: facade.pokemonSelected.hp,
          },
        ],
      }),
    });
    facade.generarPokemon();
    facade.vidaYo += 100;
  }
}
