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
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1025)}`
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .then((response) => {
        this.pokemonSelected = new Pokemon(response.sprites.front_default);
      });
  }
}
