import { LIBROS_KEY } from "./constantes.js";

let libros = [];

const contenedor = document.getElementById("libro");
const template = document.getElementById("tempLibro");

function escribirLibro(contenedor, template, libro) {
  let node = template.content.cloneNode(true);
  node.querySelector("#nomLibro").textContent = libro.titulo;
  node.querySelector("#nomAut").textContent = libro.autor;
  node.querySelector("#numPag").textContent = libro.paginas;
  node.querySelector("#pres").textContent = libro.prestado ? "Si" : "No";

  contenedor.appendChild(node);
}

let stringLibros = sessionStorage.getItem(LIBROS_KEY);
if (stringLibros !== null) {
  libros = JSON.parse(stringLibros);
  libros.forEach((element) => {
    escribirLibro(contenedor, template, element);
  });
}
