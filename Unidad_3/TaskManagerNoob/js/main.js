import { GeneralTasks } from "./patterns/taskSingleton.js";
import { Task } from "./models/task.js";

let general = new GeneralTasks();

const btnCrear = document.getElementById("submitCrear");
const inputTitulo = document.getElementById("inputTitulo");
const inputDescripcion = document.getElementById("inputDescripcion");
const selectPrioridad = document.getElementById("selectPrioridad");

btnCrear.addEventListener("click", (event) => {
  general.newTask(
    new Task(
      inputTitulo.value,
      inputDescripcion.value,
      selectPrioridad[selectPrioridad.selectedIndex].value
    )
  );
});
