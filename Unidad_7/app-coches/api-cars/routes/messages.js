var express = require("express");
var router = express.Router();
let MessageService = require("../services/message-service");

router.get("/", async function (req, res, next) {
  const arrayMessages = await MessageService.get();
  res.status(200).json(arrayMessages);
});
router.get("/:id", async function (req, res, next) {
  const message = await MessageService.getById(req.params.id);
  res.status(200).json(message);
});
router.post("/", async function (req, res, next) {
  await MessageService.post(req.body);
  res.status(201).json(true);
});

router.put("/:id", async function (req, res, next) {
  const message = await MessageService.put(
    req.params.id,
    req.body.gmail,
    req.body.subject,
    req.body.message,
    req.body.user,
  );
  if (message.matchedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const message = await MessageService.delete(req.params.id);
  if (message.deletedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const message = await MessageService.deleteAll();
  if (message.deletedCount >= 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
