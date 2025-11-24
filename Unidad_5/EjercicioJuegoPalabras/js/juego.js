import { Facade } from "./ui/Facade.js";
import { Valores } from "./patterns/valoresSingleton.js";

const btnValidar = document.getElementById("btnValidar");
const inputPalabra = document.getElementById("inputPalabra");

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

function comprobarPunto() {
  valores.sumarPuntos(1);
  facade.eliminarPalabra(inputPalabra.value);
  inputPalabra.value = "";
  inputPalabra.focus();
}
