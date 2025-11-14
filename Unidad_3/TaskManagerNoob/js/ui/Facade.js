import { GeneralTasks } from "../patterns/taskSingleton.js";

class Facade {
  constructor() {
    this.templateFiltrados = document.getElementById("templateTarea");
    this.contenedorFiltrados = document.getElementById("filtrados");
    this.general = new GeneralTasks();
  }
  construirTasks(tasks) {
    this.derruirTodo();
    tasks.forEach((task) => {
      let node = this.templateFiltrados.content.cloneNode(true);
      node.querySelector("#tituloTarea").textContent = task.title;
      node.querySelector("#descripcionTarea").textContent = task.description;
      node.querySelector("#prioridadTarea").textContent = task.priority;

      let fecha = new Date(task.createAt);

      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anyo = fecha.getFullYear();
      let horas = fecha.getHours();
      let minutos = fecha.getMinutes().toString().padStart(2, "0");
      let segundos = fecha.getSeconds().toString().padStart(2, "0");

      node.querySelector(
        "#creadoTarea"
      ).textContent = `${dia}/${mes}/${anyo} ${horas}:${minutos}:${segundos}`;
      node.querySelector("#completadaTarea").textContent = task.done
        ? "Si"
        : "No";
      let buttonEditar = node.querySelector("#btnEditarTarea");
      let buttonEliminar = node.querySelector("#btnCerrarTarea");

      buttonEliminar.addEventListener("click", (event) => {
        this.general.deleteTask(task.id);
        window.location.href = "index.html#sectionBuscador";
      });
      buttonEditar.addEventListener("click", (event) => {
        this.general.changeState(task.id);
        window.location.href = "index.html#sectionBuscador";
      });
      this.contenedorFiltrados.appendChild(node);
    });
  }
  derruirTodo() {
    this.contenedorFiltrados.innerHTML = "";
  }
}

export { Facade };
