var express = require("express");
var router = express.Router();
let UserService = require("../services/user-service");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const arrayUsers = await UserService.get();
  res.status(201).json(arrayUsers);
});
router.get("/:id", async function (req, res, next) {
  const user = await UserService.getById(req.params.id);
  res.status(201).json(user);
});
router.post("/", async function (req, res, next) {
  await UserService.post(req.body);
  res.status(201).json(true);
});
router.put("/:id", async function (req, res, next) {
  const user = await UserService.put(
    req.params.id,
    req.body.name,
    req.body.owner,
    req.body.race,
    req.body.state,
    req.body.age,
    req.body.photo,
  );
  if (user.matchedCount === 1) {
    res.status(201).json(user);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const user = await UserService.delete(req.params.id);
  if (user.deletedCount === 1) {
    res.status(201).json(user);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const user = await UserService.deleteAll();
  if (user.deletedCount >= 1) {
    res.status(201).json(user);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
