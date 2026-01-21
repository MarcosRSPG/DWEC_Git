var express = require("express");
var router = express.Router();
let TeamService = require("../service/team-service");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const arrayHistoric = await TeamService.get();
  res.status(201).json(arrayHistoric);
});
router.get("/:id", async function (req, res, next) {
  const Historic = await TeamService.getById(req.params.id);
  res.status(201).json(Historic);
});
router.post("/", async function (req, res, next) {
  await TeamService.post(req.body.arrayPokemons);
  res.status(201).json(true);
});
router.put("/:id", async function (req, res, next) {
  const Historic = await TeamService.put(
    req.params.id,
    req.body.name,
    req.body.url,
    req.body.damage,
    req.body.health,
  );
  if (Historic.matchedCount === 1) {
    res.status(201).json(Historic);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const Historic = await TeamService.delete(req.params.id);
  if (Historic.deletedCount === 1) {
    res.status(201).json(Historic);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const Historic = await TeamService.deleteAll();
  if (Historic.deletedCount >= 1) {
    res.status(201).json(Historic);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;
