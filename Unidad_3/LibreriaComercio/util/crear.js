import { LIBROS_KEY } from "./constantes.js";

let libros = [];

const nomAutor = "Desconocido";

const btnCrear = document.getElementById("submitCrear");

cargarLibros();

btnCrear.addEventListener("click", (event) => {
  let titulo = document.getElementById("inputNombre").value;
  let nomAut = nomAutor;
  let numPag = parseInt(document.getElementById("inputPaginas").value);
  let prestado = document.getElementById("inputPrestado").checked;

  let libro = {
    titulo: titulo,
    autor: nomAut,
    paginas: numPag,
    prestado: prestado,
  };

  guardarLibro(libro);
});
function cargarLibros() {
  let stringLibros = sessionStorage.getItem(LIBROS_KEY);
  if (stringLibros !== null) {
    libros = JSON.parse(stringLibros);
  }
}
function guardarLibro(libro) {
  libros.push(libro);
  sessionStorage.setItem(LIBROS_KEY, JSON.stringify(libros));
}
