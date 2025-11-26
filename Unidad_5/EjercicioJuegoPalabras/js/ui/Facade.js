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
      }
    });
  }
  pantallaPerder() {
    let fondo = document.getElementById("fondo");
    let perder = document.getElementById("perder");
    this.inputPalabra.disabled = true;
    perder.style.visibility = "visible";
    fondo.style.visibility = "visible";
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
    p.style.left = CSS.percent(Math.random() * 92);
    let palabra = faker.word.noun();
    if (palabra.length > 10) {
      p.style.color = "red";
      p.setAttribute("modificador", "vida");
    }
    if (palabra.length > 15) {
      p.style.color = "yellow";
      p.setAttribute("modificador", "dificultad");
    }
    p.addEventListener("click", (event) => {
      this.valores.sumarPuntos(2);
      this.comprobarMod(p);
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
  comprobarMod(p) {
    if (p.getAttribute("modificador") === "vida") {
      this.valores.sumarVida();
      this.printVidas();
    }
    if (p.getAttribute("modificador") === "dificultad") {
      this.valores.bajarDificultad();
    }
  }
  crearStats() {
    let tabla = document.getElementById("registros");
    let template = document.getElementById("tempReg");
    this.registros.recogerDatos().forEach((registro) => {
      let node = template.content.firstElementChild.cloneNode(true);
      node.querySelector("#usuario").textContent = registro.nombre;
      node.querySelector("#puntos").textContent = registro.puntos;
      node.querySelector("#dificultad").textContent = registro.dificultad;

      let fecha = new Date(registro.fecha);

      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anyo = fecha.getFullYear();
      let horas = fecha.getHours();
      let minutos = fecha.getMinutes().toString().padStart(2, "0");
      let segundos = fecha.getSeconds().toString().padStart(2, "0");
      node.querySelector(
        "#fecha"
      ).textContent = `${dia}/${mes}/${anyo} ${horas}:${minutos}:${segundos}`;
      tabla.appendChild(node);
    });
  }
}
