"use strict";
import { POKEMON_KEY } from "../constantes.js";

export class GeneralPokemons {
  constructor() {
    if (GeneralPokemons.instance) return GeneralPokemons.instance;
    this.pokemons = this.recogerPokemons();
    this.contador =
      this.pokemons.length > 0
        ? this.pokemons[this.pokemons.length - 1].id + 1
        : 0;
    GeneralPokemons.instance = this;
  }
  getPokemons() {
    return this.pokemons;
  }

  recogerPokemons() {
    let stringPokemons = localStorage.getItem(POKEMON_KEY);
    if (stringPokemons !== null) {
      return JSON.parse(stringPokemons);
    }
    return [];
  }
  newPokemon(pokemons) {
    pokemons.id = this.contador;
    this.contador++;
    this.pokemons.push(pokemons);
    localStorage.setItem(POKEMON_KEY, JSON.stringify(this.pokemons));
  }
  deletePokemons() {
    localStorage.removeItem(POKEMON_KEY);
  }
}
