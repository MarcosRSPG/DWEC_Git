"use strict";
import {
  TRENES_KEY,
  SODOR_KNAPFORD,
  SODOR_VICARSTOWN,
  KNAPFORD_VICARSTOWN,
  VICARSTOWN_TIDMOUTH,
} from "./constantes.js";

let arrTren = [];

const selectOr = document.getElementById("selectEsOr");
const selectDes = document.getElementById("selectEsDes");
const selectTren = document.getElementById("selectSelTren");

const eventos = [
  ["Viaje sin incidentes", 0],
  ["¡Retraso por ovejas en la vía!", 10],
  ["¡Avería en el motor!", 20],
];

cargarTrenes();
const calcularViaje = document.getElementById("submitSimVia");
const matDest = [
  [0, SODOR_KNAPFORD, SODOR_VICARSTOWN, SODOR_KNAPFORD + KNAPFORD_VICARSTOWN],
  [
    SODOR_KNAPFORD,
    0,
    KNAPFORD_VICARSTOWN,
    KNAPFORD_VICARSTOWN + VICARSTOWN_TIDMOUTH,
  ],
  [SODOR_VICARSTOWN, KNAPFORD_VICARSTOWN, 0, VICARSTOWN_TIDMOUTH],
  [
    SODOR_VICARSTOWN + VICARSTOWN_TIDMOUTH,
    KNAPFORD_VICARSTOWN + VICARSTOWN_TIDMOUTH,
    VICARSTOWN_TIDMOUTH,
    0,
  ],
];

calcularViaje.addEventListener("click", (event) => {
  event.preventDefault();
  let valOr = selectOr[selectOr.selectedIndex].value;
  let valDes = selectDes[selectDes.selectedIndex].value;
  let valTren = selectTren[selectTren.selectedIndex].value;
  let trenSelect = null;
  arrTren.forEach((element) => {
    if (element.nombre === valTren) {
      trenSelect = element;
    }
  });
  let dist = matDest[valOr][valDes];
  let eventoOcurre = eventos[Math.floor(Math.random() * 3)];

  let tiempo = dist / trenSelect.velocidad + eventoOcurre[1];
});

function cargarTrenes() {
  let stringTrenes = localStorage.getItem(TRENES_KEY);
  if (stringTrenes !== null) {
    arrTren = JSON.parse(stringTrenes);
  }
}
function crearTiempo(lugOr, lugDes, tren, dist, tiempo, incidente) {
    
}
