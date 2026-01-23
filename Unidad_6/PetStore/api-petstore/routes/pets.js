var express = require("express");
var router = express.Router();
let PetService = require("../services/pet-service");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const arrayPets = await PetService.get();
  res.status(201).json(arrayPets);
});
router.get("/:id", async function (req, res, next) {
  const pet = await PetService.getById(req.params.id);
  res.status(201).json(pet);
});
router.post("/", async function (req, res, next) {
  await PetService.post(req.body);
  res.status(201).json(true);
});
router.put("/:id", async function (req, res, next) {
  const pet = await PetService.put(
    req.params.id,
    req.body.name,
    req.body.owner,
    req.body.race,
    req.body.state,
    req.body.age,
    req.body.photo,
  );
  if (pet.matchedCount === 1) {
    res.status(201).json(pet);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const pet = await PetService.delete(req.params.id);
  if (pet.deletedCount === 1) {
    res.status(201).json(pet);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const pet = await PetService.deleteAll();
  if (pet.deletedCount >= 1) {
    res.status(201).json(pet);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
