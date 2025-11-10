"use strict";

import { TRENES_KEY } from "./constantes.js";

const inputNom = document.getElementById("inputNom");
const inputVel = document.getElementById("inputVel");
const selectTipo = document.getElementById("selectTip");
const btnNewTren = document.getElementById("submitNewTren");

const contenedor = document.getElementById("selectSelTren");
const template = document.getElementById("opTren");

let arrTren = [];
cargarTrenes();
cargarSelectTrenes();
btnNewTren.addEventListener("click", (event) => {
  let newTrain = {
    nombre: inputNom.value,
    velocidad: inputVel.value,
    tipo: selectTipo[selectTipo.selectedIndex].value,
    fechAlt: new Date(Date.now()),
  };
  guardarTren(newTrain);
});

function guardarTren(tren) {
  arrTren.push(tren);
  localStorage.setItem(TRENES_KEY, JSON.stringify(arrTren));
}

function cargarTrenes() {
  let stringTrenes = localStorage.getItem(TRENES_KEY);
  if (stringTrenes !== null) {
    arrTren = JSON.parse(stringTrenes);
  }
}

function cargarSelectTrenes() {
  let id = 0;
  arrTren.forEach((tren) => {
    let node = template.content.cloneNode(true);
    node.querySelector("#optNomTren").textContent = tren.nombre;
    node.value = id;
    contenedor.appendChild(node);
    id++;
  });
}
