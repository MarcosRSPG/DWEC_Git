import { REGISTER, ACTUAL_USER } from "../constantes.js";

export class Registro {
  constructor() {
    if (Registro.instance) return Registro.instance;
    this.registros = this.recogerDatos();
    Registro.instance = this;
  }
  meterDato(registro) {
    registro.nombre = localStorage.getItem(ACTUAL_USER);
    this.registros.forEach((unidad) => {
      if (
        unidad.nombre === registro.nombre &&
        unidad.fecha === registro.fecha
      ) {
        return false;
      }
    });
    this.registros.push(registro);
    localStorage.setItem(REGISTER, JSON.stringify(this.registros));
    return true;
  }
  modificarUsuario(user) {
    localStorage.setItem(ACTUAL_USER, user);
  }
  recogerDatos() {
    let stringRegistro = localStorage.getItem(REGISTER);
    if (stringRegistro !== null) {
      return JSON.parse(stringRegistro)
        .toSorted((a, b) => a.puntos - b.puntos)
        .reverse();
    }
    return [];
  }
}
