import { PUNTUACION } from "./constantes.JS";

const span = document.getElementById("spanPuntuaciones");

span.textContent = localStorage.getItem(PUNTUACION);
localStorage.removeItem(PUNTUACION);
