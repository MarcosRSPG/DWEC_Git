import { Facade } from "./ui/Facade.js";

const btnValidar = document.getElementById("btnValidar");
const inputPalabra = document.getElementById("inputPalabra");

const facade = new Facade();
facade.printVidas();
facade.crearPalabras(2000, 20);
