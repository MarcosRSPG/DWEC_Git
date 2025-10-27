import { cambiar } from "./conversor.js";

const btnCambiar = document.getElementById("inputSubmit");
const monto = parseFloat(document.getElementById("inputImporte").value);
const divisaFrom = document.getElementById("inputDivisaFrom");
const divisaTo = document.getElementById("inputDivisaTo");
const divisaFromSelected = parseInt(divisaFrom[divisaFrom.selectedIndex].value);
const divisaToSelected = parseInt(divisaTo[divisaTo.selectedIndex].value);
let cambio = 0;

btnCambiar.addEventListener("click", (event) => {
  event.preventDefault();
  cambio = cambiar(monto, divisaFromSelected, divisaToSelected);
});
