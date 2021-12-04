const express = require("express");
const Order = require("../models/order");
const utils = require("../utils");

const router = express.Router();

router.get("/", (request, response) => {
  Order.find({ deleted: false, user: request.userId })
    .populate("products.product", "_id title price description image")
    .exec((error, orders) => {
      response.send(utils.createResult(error, orders));
    });
});

module.exports = router;