import { faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9.0.0/+esm";
import { Valores } from "../patterns/valoresSingleton.js";

export class Facade {
  constructor() {
    this.valores = new Valores();
    this.seccionPalabras = document.getElementById("seccionPalabras");
    this.seccionVidas = document.getElementById("pvidas");
    this.seccionPuntos = document.getElementById("ppuntos");
  }
  crearPalabras(secsCreacion, secsMovimiento) {
    setInterval(() => this.nuevaPalabra(), secsCreacion);
    setInterval(() => this.moverPalabras(), secsMovimiento);
  }
  moverPalabras() {
    this.seccionPalabras.childNodes.forEach((node) => {
      node.style.top = (parseFloat(node.style.top) || 0) + 0.3 + "%";
      if ((parseFloat(node.style.top) || 0) >= 97) {
        this.seccionPalabras.removeChild(node);
        this.valores.restarVida();
        this.printVidas();
      }
    });
  }
  eliminarPalabra(palabra) {
    this.seccionPalabras.childNodes.forEach((node) => {
      if (node.textContent.toLowerCase() === palabra.toLowerCase()) {
        this.seccionPalabras.removeChild(node);
        this.printPuntos();
      }
    });
  }
  nuevaPalabra() {
    const p = document.createElement("p");
    p.style.top = CSS.percent(0);
    p.style.left = CSS.percent(Math.random() * 94);
    p.addEventListener("click", (event) => {
      p.style.color = "red";
    });
    p.appendChild(document.createTextNode(faker.word.noun()));

    this.seccionPalabras.appendChild(p);
  }
  printVidas() {
    this.seccionVidas.textContent = this.valores.getVidas();
  }
  printPuntos() {
    this.seccionPuntos.textContent = this.valores.getPuntos();
  }
}
