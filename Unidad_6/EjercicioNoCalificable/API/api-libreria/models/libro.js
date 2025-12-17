// Clase Libro
let crypto = require("crypto");

class Libro {
  constructor(titulo, autor, anio) {
    this.id = this.generarGeoID();
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }
  generarGeoID() {
    return crypto.randomUUID();
  }
}

module.exports = Libro;
