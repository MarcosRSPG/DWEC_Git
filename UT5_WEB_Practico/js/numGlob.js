import { NUM_GLOB } from "./constantes.js";

const inputNumGlob = document.getElementById("numGlob");
const submitEjecutar = document.getElementById("ejecutar");
const spanMin = document.getElementById("spanMin");
const spanMax = document.getElementById("spanMax");
const numErr = document.getElementById("numErr");

numErr.textContent = "";

let diaActual = new Date(Date.now());
let numeros = [15, Number.parseInt(diaActual.getDate())];

const numMin = Math.min(...numeros);
const numMax = Math.max(...numeros);

spanMin.textContent = numMin;
spanMax.textContent = numMax;

submitEjecutar.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputNumGlob.value >= numMin && inputNumGlob.value <= numMax) {
    localStorage.setItem(NUM_GLOB, inputNumGlob.value);
    window.location.href = "juego.html";
  } else {
    numErr.textContent = `Debe ser un numero entre el ${numMin} y el ${numMax}`;
  }
});
