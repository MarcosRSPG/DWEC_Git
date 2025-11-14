class FilterStrategy {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  filter(array, data) {
    return this.strategy.filter(array, data);
  }
}
class FilterTaskByState {
  filter(array, data) {
    return data === "Todos"
      ? array
      : array.filter((x) => String(x.done) === data);
  }
}
class FilterTaskByPriority {
  filter(array, data) {
    return data === "Todos" ? array : array.filter((x) => x.priority === data);
  }
}

export { FilterStrategy, FilterTaskByState, FilterTaskByPriority };
