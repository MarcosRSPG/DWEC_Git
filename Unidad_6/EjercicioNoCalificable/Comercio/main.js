// Navegación
document.getElementById("logo").addEventListener("click", mostrarHome);
document.getElementById("btnHome").addEventListener("click", mostrarHome);
document
  .getElementById("btnConsultar")
  .addEventListener("click", mostrarConsultar);
document.getElementById("btnCrear").addEventListener("click", mostrarCrear);

document.getElementById("formCrear").addEventListener("submit", crearLibro);

// Navegación
function ocultarTodo() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("consultar").classList.add("hidden");
  document.getElementById("crear").classList.add("hidden");
}

function mostrarHome() {
  ocultarTodo();
  document.getElementById("home").classList.remove("hidden");
}

async function mostrarConsultar() {
  ocultarTodo();
  document.getElementById("consultar").classList.remove("hidden");
  await pintarLibros();
}

function mostrarCrear() {
  ocultarTodo();
  document.getElementById("crear").classList.remove("hidden");
}

// Crear libro
async function crearLibro(event) {
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const anio = document.getElementById("anio").value;
  await fetch("http://localhost:3000/libros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo: titulo, autor: autor, anio: anio }),
  });
  event.target.reset();
  await mostrarConsultar();
}

// Pintar libros
async function pintarLibros() {
  const tbody = document.getElementById("tablaLibros");
  tbody.innerHTML = "";
  await fetch("http://localhost:3000/libros")
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Something went wrong on API server!");
      }
      return response.json();
    })
    .then((response) => {
      for (const libro of response) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.anio}</td>
            `;
        fila.addEventListener("click", (event) => {
          eliminarLibro(libro.id);
          pintarLibros();
        });
        tbody.appendChild(fila);
      }
    });
}
async function eliminarLibro(id) {
  await fetch(`http://localhost:3000/libros/${id}`, {
    method: "DELETE",
  });
}
