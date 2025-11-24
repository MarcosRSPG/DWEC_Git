import { REGISTER } from "../constantes.js";

export class Registro {
  constructor() {
    if (Registro.instance) return Registro.instance;
    this.registros = this.recogerDatos();
    this.usuario = "";
    Registro.instance = this;
  }
  meterDato(registro) {
    registro.nombre = this.usuario;
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
    this.usuario = user;
  }
  recogerDatos() {
    let stringRegistro = localStorage.getItem(REGISTER);
    if (stringRegistro !== null) {
      return JSON.parse(stringRegistro);
    }
    return [];
  }
}
