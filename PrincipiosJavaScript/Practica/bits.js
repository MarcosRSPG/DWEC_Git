let num = 8.5;
function sacarUnos(num) {
  if (num < 0) {
    return "Tiene que ser positivo";
  }
  return num
    .toString(2)
    .split("")
    .filter((n) => n == 1).length;
}
console.log(sacarUnos(num));
