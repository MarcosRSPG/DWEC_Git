let num = 123456789;

function reordenar(num) {
  let numeros = num.toString().split("");
  console.log(numeros.sort().reverse());
}
console.log(reordenar(num));
