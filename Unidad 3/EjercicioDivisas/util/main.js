import { cambiar } from "./conversor.js";
import { generarHistorico } from "./historico.js";
import { HISTORIC_KEY } from "./constantes.js";

const divisas = ["euros", "libras", "dolares"];
let arrayHistorico = [];

const btnCambiar = document.getElementById("inputSubmit");
const figureFlechas = document.getElementById("figureFlechas");

const contenedor = document.getElementById("historico");
const template = document.getElementById("texto");

const divisaFrom = document.getElementById("inputDivisaFrom");
const divisaTo = document.getElementById("inputDivisaTo");

let cambio = 0;

loadHistoric();

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

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const ano = fecha.getFullYear();
  const hora = String(fecha.getHours()).padStart(2, "0");
  const min = String(fecha.getMinutes()).padStart(2, "0");

  let objHistorico = {
    dia: dia,
    mes: mes,
    ano: ano,
    hora: hora,
    min: min,
    monto: monto.toFixed(2),
    divisaFrom: divisas[parseInt(divisaFromSelected)],
    cambio: cambio.toFixed(2),
    divisaTo: divisas[parseInt(divisaToSelected)],
  };

  generarHistorico(contenedor, template, objHistorico);
  addLineHistoricToLocalStorage(objHistorico);
});

function addLineHistoricToLocalStorage(objHistorico) {
  arrayHistorico.push(objHistorico);
  localStorage.setItem(HISTORIC_KEY, JSON.stringify(arrayHistorico));
}

function loadHistoric() {
  let stringHistoric = localStorage.getItem(HISTORIC_KEY);
  if (stringHistoric !== null) {
    arrayHistorico = JSON.parse(stringHistoric);
    arrayHistorico.forEach((element) => {
      generarHistorico(contenedor, template, element);
    });
  }
}
