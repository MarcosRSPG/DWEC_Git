var express = require("express");
var router = express.Router();
let LogService = require("../services/log-service");

/* GET logs listing. */
router.get("/", async function (req, res, next) {
  const arrayLogs = await LogService.get();
  res.status(201).json(arrayLogs);
});
router.get("/:id", async function (req, res, next) {
  const log = await LogService.getById(req.params.id);
  res.status(201).json(log);
});
router.get("/time/:time", async function (req, res, next) {
  const log = await LogService.getByTime(req.params.id);
  res.status(201).json(log);
});
router.post("/", async function (req, res, next) {
  await LogService.post(req.body);
  res.status(201).json(true);
});

router.delete("/:id", async function (req, res, next) {
  const log = await LogService.delete(req.params.id);
  if (log.deletedCount === 1) {
    res.status(201).json(log);
  } else {
    res.status(404).send("Not Found");
  }
});

router.delete("/", async function (req, res, next) {
  const log = await LogService.deleteAll();
  if (log.deletedCount >= 1) {
    res.status(201).json(log);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
