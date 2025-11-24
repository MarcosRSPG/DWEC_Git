import { REGISTER } from "./constantes.js";

export class Registro {
  constructor() {
    if (Registro.instance) return Registro.instance;
    this.usuarios = this.recogerDatos();
    Registro.instance = this;
  }
  meterDato(registro) {
    this.usuarios.push(registro);
    localStorage.setItem(REGISTER, JSON.stringify(this.usuarios));
  }
  recogerDatos() {
    let stringRegistro = localStorage.getItem(REGISTER);
    if (stringRegistro !== null) {
      return JSON.parse(stringRegistro);
    }
    return [];
  }
}
