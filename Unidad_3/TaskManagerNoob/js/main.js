import { GeneralTasks } from "./patterns/taskSingleton.js";
import { Task } from "./models/task.js";

import { Facade } from "./ui/Facade.js";
let general = new GeneralTasks();

const btnCrear = document.getElementById("submitCrear");
const inputTitulo = document.getElementById("inputTitulo");
const inputDescripcion = document.getElementById("inputDescripcion");
const selectPrioridad = document.getElementById("selectPrioridad");

const filtrarPrioridad = document.getElementById("filtrarPrioridad");
const filtrarCompletado = document.getElementById("filtrarCompletado");

let modificador = new Facade();

modificador.construirTasks(general.getTasks());

btnCrear.addEventListener("click", (event) => {
  general.newTask(
    new Task(
      inputTitulo.value,
      inputDescripcion.value,
      selectPrioridad[selectPrioridad.selectedIndex].value
    )
  );
});

filtrarPrioridad.addEventListener("change", (event) => {
  modificador.construirTasks(general.getTasks());
});
filtrarCompletado.addEventListener("change", (event) => {
  modificador.construirTasks(general.getTasks());
});
