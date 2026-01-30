var express = require("express");
var router = express.Router();
let SongService = require("../services/song-service");

router.get("/", async function (req, res, next) {
  const arraySongs = await SongService.get();
  res.status(200).json(arraySongs);
});
router.get("/:id", async function (req, res, next) {
  const song = await SongService.getById(req.params.id);
  res.status(200).json(song);
});
router.get("/:id/songs", async function (req, res, next) {
  const song = await SongService.getByAlbum(req.params.id);
  res.status(200).json(song);
});
router.post("/", async function (req, res, next) {
  await SongService.post(req.body);
  res.status(201).json(true);
});

router.put("/:id", async function (req, res, next) {
  const song = await SongService.put(
    req.params.id,
    req.body.title,
    req.body.duration,
    req.body.rating,
    req.body.albumId,
    req.body.listened,
  );
  if (song.matchedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const song = await SongService.delete(req.params.id);
  if (song.deletedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const song = await SongService.deleteAll();
  if (song.deletedCount >= 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
