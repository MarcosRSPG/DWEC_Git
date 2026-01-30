var express = require("express");
var router = express.Router();
let UserService = require("../services/user-service");

router.get("/", async function (req, res, next) {
  const arrayUsers = await UserService.get();
  res.status(200).json(arrayUsers);
});

router.get("/:id", async function (req, res, next) {
  const user = await UserService.getById(req.params.id);
  res.status(200).json(user);
});

router.get("/verify/:token", async function (req, res, next) {
  const user = await UserService.getByToken(req.params.token);
  if (user) {
    res.status(200).json({ valid: true, user: user });
  } else {
    res.status(401).json({ valid: false, user: null });
  }
});

router.post("/", async function (req, res, next) {
  await UserService.post(req.body);
  res.status(201).json(true);
});

router.post("/login", async function (req, res, next) {
  const user = await UserService.comprobarCredenciales(req.body);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.post("/logout/:userId", async function (req, res, next) {
  const result = await UserService.logout(req.params.userId);
  if (result.modifiedCount === 1) {
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.put("/:id", async function (req, res, next) {
  const user = await UserService.put(
    req.params.id,
    req.body.name,
    req.body.password,
    req.body.admin,
    req.body.token,
  );
  if (user.matchedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

router.delete("/:id", async function (req, res, next) {
  const user = await UserService.delete(req.params.id);
  if (user.deletedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

router.delete("/", async function (req, res, next) {
  const user = await UserService.deleteAll();
  if (user.deletedCount >= 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
