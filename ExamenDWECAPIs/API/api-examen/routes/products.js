var express = require("express");
var router = express.Router();
let ProductService = require("../services/product-service");

/* GET products listing. */
router.get("/", async function (req, res, next) {
  const arrayProducts = await ProductService.get();
  res.status(201).json(arrayProducts);
});
router.get("/:id", async function (req, res, next) {
  const product = await ProductService.getById(req.params.id);
  res.status(201).json(product);
});

router.post("/", async function (req, res, next) {
  await ProductService.post(req.body);
  res.status(201).json(true);
});

router.delete("/:id", async function (req, res, next) {
  const product = await ProductService.delete(req.params.id);
  if (product.deletedCount === 1) {
    res.status(201).json(product);
  } else {
    res.status(404).send("Not Found");
  }
});

router.delete("/", async function (req, res, next) {
  const product = await ProductService.deleteAll();
  if (product.deletedCount >= 1) {
    res.status(201).json(product);
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
