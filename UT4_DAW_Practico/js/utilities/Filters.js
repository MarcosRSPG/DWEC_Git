class FilterStrategy {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  filter(array, data) {
    return this.strategy.filter(array, data);
  }
}
class FilterPokemonByName {
  filter(array, data) {
    return array.filter((x) =>
      x.nombre.toLowerCase().includes(data.toLowerCase())
    );
  }
}
class FilterPokemonByType {
  filter(array, data) {
    return array.filter((x) =>
      x.tipo.toLowerCase().includes(data.toLowerCase())
    );
  }
}
class FilterNoRepes {
  filter(array) {
    let sinRep = [];
    for (let pokemon of array) {
      if (!sinRep.includes(pokemon)) {
        sinRep.push(pokemon);
      }
    }
    return sinRep;
  }
}

export {
  FilterStrategy,
  FilterPokemonByName,
  FilterPokemonByType,
  FilterNoRepes,
};
