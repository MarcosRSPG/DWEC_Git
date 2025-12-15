import { Pokemon } from "../models/Pokemon.js";

export class Facade {
  constructor() {
    this.imagen = document.getElementById("imgBattlePokemon");
    this.foto =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/132.png";
    this.hp = 48;
    this.damage = 48;
    this.pokemonSelected = new Pokemon(this.foto, this.hp, this.damage);
  }
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
    this.recogerPokemon();
    this.imagen.src = this.pokemonSelected.url;
  }
  async recogerPokemon() {
    let numero = Math.floor(Math.random() * 1025);
    await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .then((response) => {
        this.foto = response.sprites.front_default;
        this.hp = response.stats.filter(
          (p) => p.stat.name === "hp"
        )[0].base_stat;
        this.damage = response.stats.filter(
          (p) => p.stat.name === "attack"
        )[0].base_stat;
        this.pokemonSelected = new Pokemon(foto, damage, hp);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
