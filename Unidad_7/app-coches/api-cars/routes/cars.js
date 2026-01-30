var express = require("express");
var router = express.Router();
let CarService = require("../services/car-service");

router.get("/", async function (req, res, next) {
  const arrayCars = await CarService.get();
  res.status(200).json(arrayCars);
});
router.get("/:id", async function (req, res, next) {
  const car = await CarService.getById(req.params.id);
  res.status(200).json(car);
});
router.post("/", async function (req, res, next) {
  await CarService.post(req.body);
  res.status(201).json(true);
});

router.put("/:id", async function (req, res, next) {
  const car = await CarService.put(
    req.params.id,
    req.body.brand,
    req.body.model,
    req.body.year,
    req.body.price,
    req.body.photo,
    req.body.user,
  );
  if (car.matchedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const car = await CarService.delete(req.params.id);
  if (car.deletedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const car = await CarService.deleteAll();
  if (car.deletedCount >= 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
