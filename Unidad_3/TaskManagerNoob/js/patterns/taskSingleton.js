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
  getTasks() {
    return this.tasks;
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
  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks));
  }
  changeState(id) {
    id = Number(id);

    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      console.warn("No se encontró la tarea con id", id, this.tasks);
      return;
    }

    task.done = !task.done;

    localStorage.setItem(TASK_KEY, JSON.stringify(this.tasks));
  }
}
