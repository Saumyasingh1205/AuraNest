const router = require("express").Router();
const fs = require("fs");

const ordersFile = "./data/orders.json";

/*
  Mock payment endpoint
  Simulates successful payment
*/
router.post("/pay", (req, res) => {
  const orders = JSON.parse(fs.readFileSync(ordersFile));

  const newOrder = {
    id: Date.now(),
    items: req.body.items,
    amount: req.body.amount,
    status: "PAID",
    paymentMode: "Mock Payment",
    date: new Date().toISOString()
  };

  orders.push(newOrder);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.json({
    success: true,
    message: "Payment successful (Mock)",
    order: newOrder
  });
});

module.exports = router;
