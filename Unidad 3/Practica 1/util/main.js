import { cambiar } from "./conversor.js";
import { generarHistorico } from "./historico.js";

const divisas = ["euros", "libras", "dolares"];

const btnCambiar = document.getElementById("inputSubmit");
const figureFlechas = document.getElementById("figureFlechas");

const contenedor = document.getElementById("historico");
const template = document.getElementById("texto");

const divisaFrom = document.getElementById("inputDivisaFrom");
const divisaTo = document.getElementById("inputDivisaTo");

let cambio = 0;

figureFlechas.addEventListener("click", (event) => {
  event.preventDefault();
  let divisaFromSelected = divisaFrom.selectedIndex;
  let divisaToSelected = divisaTo.selectedIndex;

  divisaFrom.selectedIndex = divisaToSelected;
  divisaTo.selectedIndex = divisaFromSelected;
});

btnCambiar.addEventListener("click", (event) => {
  event.preventDefault();
  let monto = parseFloat(document.getElementById("inputImporte").value);
  let divisaFromSelected = divisaFrom[divisaFrom.selectedIndex].value;
  let divisaToSelected = divisaTo[divisaTo.selectedIndex].value;
  cambio = cambiar(
    monto,
    parseInt(divisaFromSelected),
    parseInt(divisaToSelected)
  );
  let fecha = new Date(Date.now());

  let frase = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()} importe ${monto} ${
    divisas[parseInt(divisaFromSelected)]
  } - ${resultado} ${divisas[parseInt(divisaToSelected)]}`;

  generarHistorico(contenedor, template, frase);
});
