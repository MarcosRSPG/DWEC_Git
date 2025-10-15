let base = ["R", "R", "G", "B", "R", "G", "B", "B"];
let opciones = ["R", "G", "B"];
function hacerPiramide(base) {
  console.log(base.join(" "));
  cumulSP = "";
  for (let i = base.length - 1; i > 0; i--) {
    let nuevaRow = [];
    for (let y = 0; y < base.length - 1; y++) {
      if (base[y] === base[y + 1]) {
        nuevaRow.push(base[y]);
      }
      if (base[y] !== base[y + 1]) {
        nuevaRow.push(
          (base[y] === "R" && base[y + 1] === "G") ||
            (base[y] === "G" && base[y + 1] === "R")
            ? "B"
            : (base[y] === "R" && base[y + 1] === "B") ||
              (base[y] === "B" && base[y + 1] === "R")
            ? "G"
            : "R"
        );
      }
    }
    cumulSP += " ";
    console.log(cumulSP + nuevaRow.join(" "));
    base = nuevaRow;
  }
}
hacerPiramide(base);
