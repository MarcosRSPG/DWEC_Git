"use strict";
import { STATE_KEY } from "../constantes.js";

export class GeneralStats {
  constructor() {
    if (GeneralStats.instance) return GeneralStats.instance;
    this.stats = this.recogerStats();
    this.contador =
      this.stats.length > 0 ? this.stats[this.stats.length - 1].id + 1 : 0;
    GeneralStats.instance = this;
  }
  getStats() {
    return this.stats;
  }

  recogerStats() {
    let stringStats = localStorage.getItem(STATE_KEY);
    if (stringStats !== null) {
      return JSON.parse(stringStats);
    }
    return [];
  }
  newState(state) {
    state.id = this.contador;
    this.contador++;
    this.stats.push(state);
    localStorage.setItem(STATE_KEY, JSON.stringify(this.stats));
  }
}
