import { GeneralPokemons } from "../patterns/PokemonSingleton.js";
import {
  FilterStrategy,
  FilterPokemonByName,
  FilterPokemonByType,
  FilterNoRepes,
} from "../utilities/Filters.js";

class Facade {
  constructor() {
    this.templateFiltrados = document.getElementById("templatePokemon");
    this.contenedorFiltrados = document.getElementById("filtrados");

    this.templateTipos = document.getElementById("templateStats");
    this.contenedorTipos = document.getElementById("stats");

    this.general = new GeneralPokemons();
    this.filtrador = new FilterStrategy();
  }
  construirPokemons(pokemons) {
    this.derruirTodo();
    pokemons = this.filtrar();
    pokemons.forEach((pokemon) => {
      let node = this.templateFiltrados.content.cloneNode(true);
      node.querySelector("#nombrePokemon").textContent = pokemon.nombre;
      node.querySelector("#nivelPokemon").textContent = pokemon.nivel;

      let fecha = new Date(pokemon.captured);

      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anyo = fecha.getFullYear();
      let horas = fecha.getHours();
      let minutos = fecha.getMinutes().toString().padStart(2, "0");
      let segundos = fecha.getSeconds().toString().padStart(2, "0");
      node.querySelector(
        "#capturadoPokemon"
      ).textContent = `${dia}/${mes}/${anyo} ${horas}:${minutos}:${segundos}`;
      this.contenedorFiltrados.appendChild(node);
    });
  }
  derruirTodo() {
    this.contenedorFiltrados.innerHTML = "";
  }
  construirTipos(tipos) {
    stats = this.filtrar();
    stats.forEach((Stat) => {
      let node = this.templateFiltrados.content.cloneNode(true);
      node.querySelector("#nombreStat").textContent = Stat.nombre;
      node.querySelector("#nivelStat").textContent = pokemon.nivel;

      let fecha = new Date(pokemon.captured);

      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anyo = fecha.getFullYear();
      let horas = fecha.getHours();
      let minutos = fecha.getMinutes().toString().padStart(2, "0");
      let segundos = fecha.getSeconds().toString().padStart(2, "0");
      node.querySelector(
        "#capturadoPokemon"
      ).textContent = `${dia}/${mes}/${anyo} ${horas}:${minutos}:${segundos}`;
      this.contenedorFiltrados.appendChild(node);
    });
  }
  derruirTodo() {
    this.contenedorFiltrados.innerHTML = "";
  }
  filtrar() {
    this.filtrador.setStrategy(new FilterPokemonByName());
    let filtrarNomTip = document.getElementById("inputFiltro");
    let arrayNombres = this.filtrador.filter(
      this.general.getPokemons(),
      filtrarNomTip.value
    );

    this.filtrador.setStrategy(new FilterPokemonByType());

    let arrayTipos = this.filtrador.filter(
      this.general.getPokemons(),
      filtrarNomTip.value
    );
    this.filtrador.setStrategy(new FilterNoRepes());

    return this.filtrador.filter(arrayNombres.concat(arrayTipos));
  }
}
export { Facade };
