import { Pokemon } from "../models/Pokemon.js";

export class Facade {
  constructor() {
    this.vidaYo = 400;
    this.vidaYoTotal = 400;
    this.imagenDOM = document.getElementById("imgBattlePokemon");
    this.hpDOMYo = document.querySelector("#sectionYo #progressHealth");
    this.hpDOMPokemon = document.querySelector(
      "#sectionPokemon #progressHealth",
    );
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
      element.style.visibility = element === seccion ? 1 : 0;
    });
  }
  async generarPokemon() {
    await this.recogerPokemon();
    this.imagenDOM.src = this.pokemonSelected.url;
    this.imagenDOM.alt = this.pokemonSelected.name;
    this.pintarVidas();
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
          (p) => p.stat.name === "hp",
        )[0].base_stat;
        this.damage = response.stats.filter(
          (p) => p.stat.name === "attack",
        )[0].base_stat;
        this.pokemonSelected = new Pokemon(
          this.name,
          this.foto,
          this.damage,
          this.hp,
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async cargarEquipo() {
    await fetch(`http://localhost:6968/equipo`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .then((response) => {
        const section = document.getElementById("sectionTeam");
        const template = document.getElementById("templateTeam");

        section.querySelectorAll(".cardPokeTeam").forEach((n) => n.remove());
        response.forEach((p) => {
          fetch(p.url)
            .then((response) => {
              if (response.status !== 200) {
                throw new Error("Something went wrong on API server!");
              }
              return response.json();
            })
            .then((response) => {
              const name = response.forms[0].name;
              const foto = response.sprites.front_default;

              const clone = template.content.cloneNode(true);
              const img = clone.querySelector("#imgPokemonEquipo");
              const label = clone.querySelector("#nivelEquipo");

              img.src = foto;
              img.alt = name;

              label.textContent = `HP ${p.health} · ATK ${p.damage}`;

              section.appendChild(clone);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  pintarVidas() {
    this.hpDOMYo.setAttribute("value", (this.vidaYo / this.vidaYoTotal) * 100);
    this.hpDOMPokemon.setAttribute(
      "value",
      (this.pokemonSelected.health / this.hp) * 100,
    );
  }
  quitarVida(tipo) {
    switch (tipo) {
      case "yo":
        this.vidaYo -= this.pokemonSelected.damage;
        this.pintarVidas();
      case "pokemon":
        this.pokemonSelected.restarVida(Math.random() * 20);
        this.pintarVidas();
    }
  }
}
