import { Facade } from "./ui/Facade.js";

const facade = new Facade();

const btnBattle = document.getElementById("btnBattle");
const btnTeam = document.getElementById("btnTeam");
const btnAtacar = document.getElementById("btnAtacar");
const btnEscapar = document.getElementById("btnEscapar");

facade.generarPokemon();

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
  facade.cambiarDisplay("sectionTeam");
});

btnEscapar.addEventListener("click", (event) => {
  facade.generarPokemon();
  facade.vidaYo += 200;
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
