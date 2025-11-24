import { faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9.0.0/+esm";
import { Valores } from "../patterns/valoresSingleton.js";
import { Registro } from "../patterns/registroSingleton.js";

export class Facade {
  constructor() {
    this.valores = new Valores();
    this.registros = new Registro();
    this.seccionPalabras = document.getElementById("seccionPalabras");
    this.seccionVidas = document.getElementById("pvidas");
    this.seccionPuntos = document.getElementById("ppuntos");
    this.inputPalabra = document.getElementById("inputPalabra");
    this.id1 = 0;
    this.id2 = 1;
  }
  crearPalabras(secsCreacion, secsMovimiento) {
    clearInterval(this.id1);
    clearInterval(this.id2);
    this.id1 = setInterval(() => this.nuevaPalabra(), secsCreacion);
    this.id2 = setInterval(() => this.moverPalabras(), secsMovimiento);
  }
  moverPalabras() {
    this.seccionPalabras.childNodes.forEach((node) => {
      node.style.top = (parseFloat(node.style.top) || 0) + 0.3 + "%";
      if ((parseFloat(node.style.top) || 0) >= 97) {
        this.seccionPalabras.removeChild(node);
        this.valores.restarVida();
        this.printVidas();
      }
      if (this.valores.getVidas() <= 0) {
        clearInterval(this.id1);
        clearInterval(this.id2);
        this.pantallaPerder();
        this.registrarStats();
      }
    });
  }
  pantallaPerder() {
    let perder = document.getElementById("perder");
    perder.style.visibility = "visible";
  }
  registrarStats() {
    let registro = {
      puntos: this.valores.getPuntos(),
      dificultad: this.valores.getDificultad(),
      fecha: Date.now(),
    };
    this.registros.meterDato(registro);
  }
  eliminarPalabra(palabra) {
    this.seccionPalabras.childNodes.forEach((node) => {
      if (node.textContent.toLowerCase() === palabra.toLowerCase()) {
        this.seccionPalabras.removeChild(node);
        this.printPuntos();
        this.crearPalabras(
          this.valores.getDificultad(),
          this.valores.getDificultad() / 100
        );
      }
    });
  }
  nuevaPalabra() {
    const p = document.createElement("p");
    p.style.top = CSS.percent(0);
    p.style.left = CSS.percent(Math.random() * 94);
    let palabra = faker.word.noun();
    p.addEventListener("click", (event) => {
      this.valores.sumarPuntos(2);
      this.eliminarPalabra(palabra);
      this.inputPalabra.value = "";
      this.inputPalabra.focus();
    });
    p.appendChild(document.createTextNode(palabra));
    this.seccionPalabras.appendChild(p);
  }
  printVidas() {
    this.seccionVidas.textContent = this.valores.getVidas();
  }
  printPuntos() {
    this.seccionPuntos.textContent = this.valores.getPuntos();
  }
}
