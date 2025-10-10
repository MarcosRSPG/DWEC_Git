let pin = 1234;

function contarNum(pin) {
  return pin.toString().length == 4 || pin.toString().length == 6;
}

console.log(contarNum(pin));
