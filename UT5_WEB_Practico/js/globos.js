import { NUM_GLOB, PUNTUACION } from "./constantes.js";

const seccion = document.getElementById("globos");
const imgGlobos = [
  { tipo: "rojo", src: "./img/redCircle.jpg" },
  { tipo: "verde", src: "./img/Green_Circle.png" },
];
/* let tiempo = 0;
let puntos = 0;
let numVerdes = 0;
let fallos = 0;
generarGlobos(Number.parseInt(localStorage.getItem(NUM_GLOB)));

setInterval(() => moverGlobos(), 100); */

generarGlobos(Number.parseInt(localStorage.getItem(NUM_GLOB)));

setInterval(() => moverGlobos(), 100);
let tiempo = 0;
let puntos = 0;
let numVerdes = 0;
let fallos = 0;

function generarGlobos(num) {
  for (let index = 0; index < num - 1; index++) {
    let imgGlobo = Math.floor(Math.random() * 2);
    let template = document.getElementById("tempGlob");
    let node = template.content.firstElementChild.cloneNode(true);
    node.querySelector("#imagen").setAttribute("src", imgGlobos[imgGlobo].src);
    /*     node.setAttribute("tipo", imgGlobos[imgGlobo].tipo);
    if (node.getAttribute("tipo") === "verde") {
      numVerdes++;
    }
    node.addEventListener("click", (event) => {
      if (node.getAttribute("tipo") === "verde") { 
        puntos++;
      } */
    node
      .querySelector("#imagen")
      .setAttribute("tipo", imgGlobos[imgGlobo].tipo);
    node.addEventListener("click", (event) => {
      if (imgGlobos[imgGlobo].tipo === "verde") {
        puntos++;
        numVerdes++;
      }
      if (imgGlobos[imgGlobo].tipo === "rojo") {
        fallos++;
      }
      seccion.removeChild(node);
    });
    node.style.top = CSS.percent(Math.random() * 80);
    node.style.right = CSS.percent(Math.random() * 95);
    seccion.appendChild(node);
  }
  let template = document.getElementById("tempGlob");
  let node = template.content.firstElementChild.cloneNode(true);
  node.querySelector("#imagen").setAttribute("src", "./img/Yellow_Circle.png");
  node.querySelector("#imagen").setAttribute("tipo", "amarillo");
  node.addEventListener("click", (event) => {
    seccion.removeChild(node);
  });
  node.style.top = CSS.percent(Math.random() * 80);
  node.style.right = CSS.percent(Math.random() * 95);
  seccion.appendChild(node);
}
function moverGlobos() {
  seccion.childNodes.forEach((node) => {
    let vertical = ["top", "bottom"];
    let horizontal = ["right", "left"];

    moverHorizontal(node, horizontal[Math.round(Math.random())]);
    moverVertical(node, vertical[Math.round(Math.random())]);

    tiempo += 100;
  });
  if (comprobarVerdes()) {
    let puntuacion = 1000 / (tiempo / 1000) + puntos * 10 - fallos * 5;
    localStorage.setItem(PUNTUACION, puntuacion);
    /* alert(`Tu puntuacion es: ${puntuacion}`);
    window.location.href = "numGlob.html"; */
    window.location.href = "puntuaciones.html";
  }
}
function comprobarVerdes() {
  return numVerdes === puntos;
}
function moverHorizontal(node, direccion) {
  if (direccion === "left" && parseFloat(node.style.left) <= 97) {
    node.style.left = (parseFloat(node.style.left) || 0) + 0.1 + "%";
  }
  /* if (direccion === "right" && parseFloat(node.style.left) >= 0) {
    node.style.left = (parseFloat(node.style.left) || 0) - 0.1 + "%"; */
  if (direccion === "right" && parseFloat(node.style.right) <= 97) {
    node.style.right = (parseFloat(node.style.right) || 0) + 0.1 + "%";
  }
}
function moverVertical(node, direccion) {
  if (direccion === "top" && parseFloat(node.style.top) <= 97) {
    node.style.top = (parseFloat(node.style.top) || 0) + 0.1 + "%";
  }
  /* if (direccion === "bottom" && parseFloat(node.style.top) >= 0) {
    node.style.top = (parseFloat(node.style.top) || 0) - 0.1 + "%"; */
  if (direccion === "bottom" && parseFloat(node.style.bottom) <= 97) {
    node.style.bottom = (parseFloat(node.style.bottom) || 0) + 0.1 + "%";
  }
}
