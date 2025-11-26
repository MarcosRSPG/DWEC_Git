export class Valores {
  constructor() {
    if (Valores.instance) return Valores.instance;
    this.vidas = 3;
    this.puntos = 0;
    this.dificultad = 4000;
    Valores.instance = this;
  }
  getVidas() {
    return this.vidas;
  }
  getPuntos() {
    return this.puntos;
  }
  restarVida() {
    this.vidas--;
  }
  sumarVida() {
    this.vidas++;
  }
  sumarPuntos(puntos) {
    this.puntos += puntos;
    if (this.dificultad % 10 == 0) {
      this.dificultad -= 100;
    } else {
      this.dificultad -= 5;
    }
  }
  getDificultad() {
    return this.dificultad;
  }
  bajarDificultad() {
    this.dificultad += 50;
  }
}
