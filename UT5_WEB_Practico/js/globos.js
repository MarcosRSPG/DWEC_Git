import { NUM_GLOB, PUNTUACION } from "./constantes.js";

const seccion = document.getElementById("globos");
const imgGlobos = [
  { tipo: "rojo", src: "./img/redCircle.jpg" },
  { tipo: "verde", src: "./img/Green_Circle.png" },
  { tipo: "azul", src: "./img/blue_Circle.png" },
];
let tiempo = 0;
let puntos = 0;
let numVerdes = 0;
let fallos = 0;
let multiplicador = 1;
let ejecutado = false;
generarGlobos(Number.parseInt(localStorage.getItem(NUM_GLOB)));

let id1 = setInterval(() => moverGlobos(), 100);

function generarGlobos(num) {
  for (let index = 0; index < num - 1; index++) {
    let imgGlobo = Math.floor(Math.random() * 3);
    let template = document.getElementById("tempGlob");
    let node = template.content.firstElementChild.cloneNode(true);
    node.querySelector("#imagen").setAttribute("src", imgGlobos[imgGlobo].src);
    node.setAttribute("tipo", imgGlobos[imgGlobo].tipo);
    if (node.getAttribute("tipo") === "verde") {
      numVerdes++;
    }
    node.addEventListener("click", (event) => {
      if (node.getAttribute("tipo") === "verde") {
        puntos++;
      }
      if (node.getAttribute("tipo") === "rojo") {
        fallos++;
      }
      if (node.getAttribute("tipo") === "azul") {
        clearInterval(id1);
        setTimeout(() => {
          id1 = setInterval(() => moverGlobos(), 100);
        }, 2000);
      }
      seccion.removeChild(node);
    });
    node.style.top = CSS.percent(Math.random() * 80);
    node.style.left = CSS.percent(Math.random() * 95);
    seccion.appendChild(node);
  }
  let template = document.getElementById("tempGlob");
  let node = template.content.firstElementChild.cloneNode(true);
  node.querySelector("#imagen").setAttribute("src", "./img/Yellow_Circle.png");
  node.setAttribute("tipo", "amarillo");
  node.addEventListener("click", (event) => {
    multiplicador = 2;
    seccion.removeChild(node);
  });
  node.style.top = CSS.percent(Math.random() * 80);
  node.style.left = CSS.percent(Math.random() * 95);
  seccion.appendChild(node);
}
function moverGlobos() {
  tiempo += 100;
  seccion.childNodes.forEach((node) => {
    let vertical = ["top", "bottom"];
    let horizontal = ["right", "left"];

    moverHorizontal(node, horizontal[Math.round(Math.random())]);
    moverVertical(node, vertical[Math.round(Math.random())]);

    if (tiempo > 3000 && node.getAttribute("tipo") === "amarillo") {
      seccion.removeChild(node);
    }
  });
  if (comprobarVerdes() && !ejecutado) {
    let puntuacion = parseInt(
      (1000 / (tiempo / 1000) + puntos * 10 - fallos * 5) * multiplicador
    );
    localStorage.setItem(PUNTUACION, puntuacion);
    alert(`Tu puntuacion es: ${puntuacion}`);
    ejecutado = true;
    window.location.href = "numGlob.html";
  }
}
function comprobarVerdes() {
  return numVerdes === puntos;
}
function moverHorizontal(node, direccion) {
  if (direccion === "left" && parseFloat(node.style.left) <= 97) {
    node.style.left = (parseFloat(node.style.left) || 0) + 0.5 + "%";
  }
  if (direccion === "right" && parseFloat(node.style.left) >= 0) {
    node.style.left = (parseFloat(node.style.left) || 0) - 0.5 + "%";
  }
}
function moverVertical(node, direccion) {
  if (direccion === "top" && parseFloat(node.style.top) <= 97) {
    node.style.top = (parseFloat(node.style.top) || 0) + 0.5 + "%";
  }
  if (direccion === "bottom" && parseFloat(node.style.top) >= 0) {
    node.style.top = (parseFloat(node.style.top) || 0) - 0.5 + "%";
  }
}
