"use strict";
import { TASK_KEY } from "../constantes.js";

export class GeneralTasks {
  constructor() {
    if (GeneralTasks.instance) return GeneralTasks.instance;
    this.tasks = this.recogerTasks();
    this.contador =
      this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 0;
    GeneralTasks.instance = this;
  }

  recogerTasks() {
    let stringTasks = localStorage.getItem(TASK_KEY);
    if (stringTasks !== null) {
      return JSON.parse(stringTasks);
    }
    return [];
  }
  newTask(task) {
    task.id = this.contador;
    this.contador++;
    this.tasks.push(task);
    localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks));
  }
}
