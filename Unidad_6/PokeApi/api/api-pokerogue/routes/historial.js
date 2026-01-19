var express = require("express");
var router = express.Router();
let HistorialService = require("../service/historial-service");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const arrayHistoric = await HistorialService.get();
  res.status(201).json(arrayHistoric);
});
router.get("/:id", async function (req, res, next) {
  const Historic = await HistorialService.getById(req.params.id);
  res.status(201).json(Historic);
});
router.post("/", async function (req, res, next) {
  await HistorialService.post(req.body.arrayPokemons);
  res.status(201).json(true);
});
router.put("/:id", async function (req, res, next) {
  const Historic = await HistorialService.put(
    req.params.id,
    req.body.dataStart,
    req.body.dataEnd,
    req.body.pokeName,
    req.body.damageDoneTrainer,
    req.body.damageRecivedTrainer,
    req.body.damageDonePokemon,
    req.body.captured
  );
  if (Historic.matchedCount === 1) {
    res.status(201).json(Historic);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const Historic = await HistorialService.delete(req.params.id);
  if (Historic.deletedCount === 1) {
    res.status(201).json(Historic);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const Historic = await HistorialService.deleteAll();
  if (Historic.deletedCount >= 1) {
    res.status(201).json(Historic);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;
