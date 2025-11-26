import { Facade } from "./ui/Facade.js";
import { Valores } from "./patterns/valoresSingleton.js";

const btnValidar = document.getElementById("btnValidar");
const inputPalabra = document.getElementById("inputPalabra");
const btnReload = document.getElementById("reload");
const btnStats = document.getElementById("stats");

const facade = new Facade();
const valores = new Valores();

inputPalabra.focus();
facade.printVidas();
facade.crearPalabras(valores.getDificultad(), valores.getDificultad() / 100);

btnValidar.addEventListener("click", (event) => {
  event.preventDefault();
  comprobarPunto();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    comprobarPunto();
  }
});

btnReload.addEventListener("click", (event) => {
  facade.registrarStats();
  window.location.reload();
});

btnStats.addEventListener("click", (event) => {
  facade.registrarStats();
  window.location.href = "stats.html";
});

function comprobarPunto() {
  valores.sumarPuntos(1);
  facade.eliminarPalabra(inputPalabra.value);
  inputPalabra.value = "";
  inputPalabra.focus();
}
