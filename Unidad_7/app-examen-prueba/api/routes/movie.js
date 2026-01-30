var express = require("express");
var router = express.Router();
let MovieService = require("../services/movie-service");

router.get("/", async function (req, res, next) {
  const arrayMovies = await MovieService.get();
  res.status(200).json(arrayMovies);
});
router.get("/platforms", async function (req, res, next) {
  const arrayPlatforms = await MovieService.getPlatforms();
  res.status(200).json(arrayPlatforms);
});
router.get("/genres", async function (req, res, next) {
  const arrayPlatforms = await MovieService.getGenres();
  res.status(200).json(arrayPlatforms);
});
router.get("/:id", async function (req, res, next) {
  const movie = await MovieService.getById(req.params.id);
  res.status(200).json(movie);
});
router.post("/", async function (req, res, next) {
  await MovieService.post(req.body);
  res.status(201).json(true);
});

router.put("/:id", async function (req, res, next) {
  const movie = await MovieService.put(
    req.params.id,
    req.body.title,
    req.body.genre,
    req.body.year,
    req.body.rating,
    req.body.platform,
    req.body.photo,
  );
  if (movie.matchedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
router.delete("/:id", async function (req, res, next) {
  const movie = await MovieService.delete(req.params.id);
  if (movie.deletedCount === 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});
module.exports = router;

router.delete("/", async function (req, res, next) {
  const movie = await MovieService.deleteAll();
  if (movie.deletedCount >= 1) {
    res.status(200).json(true);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
