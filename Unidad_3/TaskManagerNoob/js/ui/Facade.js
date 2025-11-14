import { GeneralTasks } from "../patterns/taskSingleton.js";
import {
  FilterStrategy,
  FilterTaskByState,
  FilterTaskByPriority,
} from "../utilities/Filters.js";

class Facade {
  constructor() {
    this.templateFiltrados = document.getElementById("templateTarea");
    this.contenedorFiltrados = document.getElementById("filtrados");
    this.filtrarPrioridad = document.getElementById("filtrarPrioridad");
    this.filtrarCompletado = document.getElementById("filtrarCompletado");
    this.general = new GeneralTasks();
    this.filtrador = new FilterStrategy();
  }
  construirTasks(tasks) {
    this.derruirTodo();
    tasks = this.filtrar(tasks);
    tasks.forEach((task) => {
      let node =
        this.templateFiltrados.content.firstElementChild.cloneNode(true);
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
      node.style.backgroundColor = task.done ? "green" : "red";
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
        window.location.reload();
      });
      buttonEditar.addEventListener("click", (event) => {
        this.general.changeState(task.id);

        window.location.href = "index.html#sectionBuscador";
        window.location.reload();
      });
      this.contenedorFiltrados.appendChild(node);
    });
  }
  derruirTodo() {
    this.contenedorFiltrados.innerHTML = "";
  }

  filtrar() {
    this.filtrador.setStrategy(new FilterTaskByPriority());
    const prioridad =
      this.filtrarPrioridad[this.filtrarPrioridad.selectedIndex].value;

    let arrayFiltrado = this.filtrador.filter(
      this.general.getTasks(),
      prioridad
    );

    this.filtrador.setStrategy(new FilterTaskByState());
    const estado =
      this.filtrarCompletado[this.filtrarCompletado.selectedIndex].value;

    return this.filtrador.filter(arrayFiltrado, estado);
  }
}
export { Facade };
