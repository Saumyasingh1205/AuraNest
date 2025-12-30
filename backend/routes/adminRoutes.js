const router = require("express").Router();
const fs = require("fs");
const auth = require("../middleware/authMiddleware");

const file = "./data/products.json";

router.post("/add-product", auth, (req, res) => {
  const products = JSON.parse(fs.readFileSync(file));
  products.push({ id: Date.now(), ...req.body });
  fs.writeFileSync(file, JSON.stringify(products, null, 2));
  res.send("Product added");
});

module.exports = router;

