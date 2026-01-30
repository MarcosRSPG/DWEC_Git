var express = require("express");
var router = express.Router();
let AlbumService = require("../services/album-service");

router.get("/", async function (req, res, next) {
  const arrayAlbums = await AlbumService.get();
  res.status(200).json(arrayAlbums);
});
router.get("/:id", async function (req, res, next) {
  const album = await AlbumService.getById(req.params.id);
  res.status(200).json(album);
});
router.get("/:id/songs", async function (req, res, next) {
  const album = await AlbumService.getNumSongs(req.params.id);
  res.status(200).json(album);
});
router.post("/", async function (req, res, next) {
  await AlbumService.post(req.body);
  res.status(201).json(true);
});

router.put("/:id", async function (req, res, next) {
  const album = await AlbumService.put(
    req.params.id,
    req.body.title,
    req.body.artist,
    req.body.year,
    req.body.genre,
    req.body.coverUrl,
  );
  if (album.matchedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const album = await AlbumService.delete(req.params.id);
  if (album.deletedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const album = await AlbumService.deleteAll();
  if (album.deletedCount >= 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
