const router = require("express").Router();
const fs = require("fs");

const file = "./data/products.json";

router.get("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync(file));
  res.json(products);
});

module.exports = router;

