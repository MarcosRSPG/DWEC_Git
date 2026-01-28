var express = require("express");
var router = express.Router();
let UserService = require("../services/user-service");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const response = await UserService.get();
  res.status(200).json(response);
});
router.get("/:id", async function (req, res, next) {
  const user = await UserService.getById(req.params.id);
  res.status(201).json(user);
});

router.post("/", async function (req, res, next) {
  await UserService.post(req.body);
  res.status(201).json(true);
});

router.post("/login/", async function (req, res, next) {
  const resultado = await UserService.comprobarCredenciales(req.body);
  res.status(200).json(resultado);
});

router.delete("/:id", async function (req, res, next) {
  const user = await UserService.delete(req.params.id);
  if (user.deletedCount === 1) {
    res.status(201).json(user);
  } else {
    res.status(404).send("Not Found");
  }
});

router.delete("/", async function (req, res, next) {
  const user = await UserService.deleteAll();
  if (user.deletedCount >= 1) {
    res.status(201).json(user);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
