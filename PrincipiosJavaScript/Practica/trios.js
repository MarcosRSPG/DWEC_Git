let enteros = [1, 5, 4, 9, -10];

function trios(enteros) {
  let resultados = [];
  for (let a in enteros) {
    for (let b in enteros) {
      for (let c in enteros) {
        if (a === b || a === c || b === c) continue;
        if (enteros[a] + enteros[b] + enteros[c] === 0) {
          if (
            resultados
              .join(",")
              .includes([enteros[a], enteros[b], enteros[c]].sort().join(","))
          ) {
            continue;
          }
          resultados.push([enteros[a], enteros[b], enteros[c]].sort());
        }
      }
    }
  }
  return resultados;
}

console.log(trios(enteros));
