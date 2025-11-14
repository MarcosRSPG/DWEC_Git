import { Pokemon } from "./models/pokemon.js";
import { GeneralPokemons } from "./patterns/PokemonSingleton.js";
import { Facade } from "./ui/Facade.js";

const btnNew = document.getElementById("submitNew");
const btnBorrar = document.getElementById("submitBorrar");
const btnStates = document.getElementById("submitEstadistica");

const inputFiltros = document.getElementById("inputFiltro");
const inputName = document.getElementById("inputNombre");
const selectType = document.getElementById("selectTipo");
const inputLevel = document.getElementById("inputNivel");

const generalPokemons = new GeneralPokemons();
let modificador = new Facade();
modificador.construirPokemons(generalPokemons.getPokemons());

btnNew.addEventListener("click", (event) => {
  generalPokemons.newPokemon(
    new Pokemon(
      inputName.value,
      selectType[selectType.selectedIndex].value,
      parseInt(inputLevel.value)
    )
  );
});
btnBorrar.addEventListener("click", (event) => {
  generalPokemons.deletePokemons();
  window.location.reload();
});

inputFiltros.addEventListener("keyup", (event) => {
  modificador.construirPokemons(generalPokemons.getPokemons());
});

btnStates.addEventListener("click", (event) => {
  let nuevoState = prompt("Pon el nuevo tipo");
});
