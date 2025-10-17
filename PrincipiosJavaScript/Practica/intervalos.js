let intervalos = [
  [1, 4],
  [3, 9],
  [1, 2],
];
function mergeOverlappingIntervals(intervals) {
  if (!Array.isArray(intervals) || intervals.length === 0) return [];

  // 1) Ordenar por el inicio del intervalo para poder recorrerlos en orden
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [];

  // Intervalo que estamos construyendo/extendiendo
  let [currentStart, currentEnd] = sortedIntervals[0];

  for (let i = 1; i < sortedIntervals.length; i++) {
    // Siguiente intervalo a considerar
    const [nextStart, nextEnd] = sortedIntervals[i];

    // ¿Se solapan? (incluye casos tocando: nextStart === currentEnd)
    const overlaps = nextStart <= currentEnd;

    if (overlaps) {
      // Extiende el final del intervalo actual si el siguiente lo sobrepasa
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      // Cierra el intervalo actual y empieza uno nuevo
      mergedIntervals.push([currentStart, currentEnd]);
      currentStart = nextStart;
      currentEnd = nextEnd;
    }
  }

  // Empuja el último intervalo construido
  mergedIntervals.push([currentStart, currentEnd]);

  return mergedIntervals;
}

console.log(mergeOverlappingIntervals(intervalos));
