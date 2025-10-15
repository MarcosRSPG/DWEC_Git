let arrUno = [1, 2, 2, 2, 2, 3];
let arrDos = [2];

function quitarRepes(arrUno, arrDos) {
  for (numero of arrDos) {
    arrUno = arrUno.filter((n) => n !== numero);
  }
  return arrUno;
}
console.log(quitarRepes(arrUno, arrDos));
