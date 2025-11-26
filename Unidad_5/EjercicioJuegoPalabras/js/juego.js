import { Facade } from "./ui/Facade.js";
import { Valores } from "./patterns/valoresSingleton.js";

const btnValidar = document.getElementById("btnValidar");
const inputPalabra = document.getElementById("inputPalabra");
const btnReload = document.getElementById("reload");
const btnStats = document.getElementById("stats");
const btnStopResume = document.getElementById("resumeStop");
const btnStopReload = document.getElementById("reloadStop");
const btnStopStats = document.getElementById("statsStop");

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

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    facade.pantallaStop();
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

btnStopResume.addEventListener("click", (event) => {
  facade.reanudar();
});
btnStopReload.addEventListener("click", (event) => {
  window.location.reload();
});
btnStopStats.addEventListener("click", (event) => {
  window.location.href = "stats.html";
});
function comprobarPunto() {
  facade.eliminarPalabra(inputPalabra.value, 1);
  inputPalabra.value = "";
  inputPalabra.focus();
}
