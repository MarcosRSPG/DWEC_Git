import { Pokemon } from "../models/Pokemon.js";

export class Facade {
  constructor() {}
  cambiarDisplay(tipo) {
    let seccion = document.getElementById(tipo);
    document.querySelectorAll("main>section").forEach((element) => {
      if (element === seccion) {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
    });
  }
  generarPokemon() {
    let imagen = document.getElementById("imgBattlePokemon");
    let pokemon = this.recogerPokemon();
  }
  recogerPokemon() {
    let foto = null;
    let pokemonSelected = new Pokemon(foto);
    fetch(
      //${Math.floor(Math.random() * 1025)}
      `https://pokeapi.co/api/v2/pokemon/694`
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .then((response) => {
        for (const pokemon of response.results) {
          foto = pokemon.sprites.front_default;
          pokemonSelected = new Pokemon(foto);
        }
      });
    return pokemonSelected;
  }
}
