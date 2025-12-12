import { Facade } from "./ui/Facade.js";

const facade = new Facade();

const btnBattle = document.getElementById("btnBattle");
const btnTeam = document.getElementById("btnTeam");

btnBattle.addEventListener("click", (event) => {
  event.preventDefault();
  facade.cambiarDisplay("sectionBattle");
  facade.generarPokemon();
});
btnTeam.addEventListener("click", (event) => {
  event.preventDefault();
  facade.cambiarDisplay("sectionTeam");
});
