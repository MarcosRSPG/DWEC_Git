import { Pokemon } from "../models/Pokemon.js";

export class Facade {
  constructor() {
    this.imagenDOM = document.getElementById("imgBattlePokemon");
    this.hpDOM = document.getElementById("progressHealth");
    this.damageDOM = document.getElementById("damageBattlePokemon");
    this.foto =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/132.png";
    this.hp = 48;
    this.damage = 48;
    this.name = "Ditto";
    this.pokemonSelected = new Pokemon(this.foto, this.hp, this.damage);
  }
  cambiarDisplay(tipo) {
    let seccion = document.getElementById(tipo);
    document.querySelectorAll("main>section").forEach((element) => {
      element.style.display = element === seccion ? "flex" : "none";
    });
  }
  async generarPokemon() {
    await this.recogerPokemon();
    this.imagenDOM.src = this.pokemonSelected.url;
    this.imagenDOM.alt = this.pokemonSelected.name;
    this.hpDOM.setAttribute(
      "value",
      (this.pokemonSelected.health / this.hp) * 100
    );
    this.damageDOM.textContent = this.pokemonSelected.damage;
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
        this.name = response.forms[0].name;
        this.foto = response.sprites.front_default;
        this.hp = response.stats.filter(
          (p) => p.stat.name === "hp"
        )[0].base_stat;
        this.damage = response.stats.filter(
          (p) => p.stat.name === "attack"
        )[0].base_stat;
        this.pokemonSelected = new Pokemon(
          this.name,
          this.foto,
          this.damage,
          this.hp
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  pintarVida() {}
}
