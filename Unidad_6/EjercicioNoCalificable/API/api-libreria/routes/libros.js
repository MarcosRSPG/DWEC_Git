var express = require("express");
var router = express.Router();

let Libro = require("../models/libro");
let arrayLibros = [{ id: 0, titulo: "Mi Libro", autor: "Yo", anio: 2003 }];

router.get("/", function (req, res, next) {
  res.json(arrayLibros);
});

router.post("/", function (req, res, next) {
  const libro = new Libro(req.body.titulo, req.body.autor, req.body.anio);
  arrayLibros.push(libro);
  res.status(201).json(true);
});

router.delete("/:id", (req, res) => {
  let arrayLibrosFiltrado = arrayLibros.filter(
    (x) => x.id.toString() !== req.params.id
  );
  if (arrayLibrosFiltrado.length === arrayLibros.length) {
    res.status(404).send("Not Found");
  } else {
    arrayLibros = arrayLibrosFiltrado;
    res.send(true);
  }
});

router.put("/:id", (req, res) => {
  let libro = undefined;
  for (let index = 0; index < arrayLibros.length; index++) {
    if (parseInt(req.params.id) === arrayLibros[index].id) {
      libro = new Libro(
        arrayLibros[index].id,
        req.body.titulo,
        req.body.autor,
        req.body.anio
      );
      arrayLibros[index] = libro;
      res.json(libro);
    }
  }

  if (!libro) {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
