export class Pokemon {
  constructor(nombre, tipo, nivel, id = null, captured = Date.now()) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.nivel = nivel;
    this.captured = captured;
  }
}
