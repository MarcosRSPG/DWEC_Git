export class Valores {
  constructor() {
    if (Valores.instance) return Valores.instance;
    this.vidas = 3;
    this.puntos = 0;
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
  sumarPuntos(puntos) {
    this.puntos += puntos;
  }
}
