const express = require("express");
const User = require("../models/user");
const utils = require("../utils");

const router = express.Router();

router.get("/", (request, response) => {
  User.findOne(
    { _id: request.userId },
    { __v: 0, deleted: 0, password: 0, createdTimestamp: 0 }
  )
    .populate("cart.product", "title description price _id image")
    .exec((error, user) => {
      if (error) {
        response.send(utils.createResult(error, null));
      } else if (!user) {
        response.send(utils.createResult("user not found", null));
      } else {
        response.send(utils.createResult(null, user.cart));
      }
    });
});

router.post("/", (request, response) => {
  const { product } = request.body;

  User.findOne(
    { _id: request.userId },
    { __v: 0, deleted: 0, password: 0, createdTimestamp: 0 }
  ).exec((error, user) => {
    if (error) {
      response.send(utils.createResult(error, null));
    } else if (!user) {
      response.send(utils.createResult("user not found", null));
    } else {
      const tempProducts = user.cart.filter(
        (tempProduct) => tempProduct._id == product
      );

      if (tempProducts.length == 0) {
        // product does not exist in the cart
        user.cart.push({
          product,
        });
      }
      //    else {
      //     // product already exists in the cart
      //     tempProducts[0].quantity = quantity;
      //   }

      user.save((error, user) => {
        response.send(utils.createResult(error, user.cart));
      });
    }
  });
});

router.patch("/:id/quantity", (request, response) => {
  const { id } = request.params;
  const { quantity } = request.body;

  User.findOne(
    { _id: request.userId },
    { __v: 0, deleted: 0, password: 0, createdTimestamp: 0 }
  ).exec((error, user) => {
    if (error) {
      response.send(utils.createResult(error, null));
    } else if (!user) {
      response.send(utils.createResult("user not found", null));
    } else {
      if (quantity == 0) {
        // delete the item from cart
        user.cart = user.cart.filter((tempProduct) => tempProduct._id != id);
      } else {
        // update the quantity
        const tempProducts = user.cart.filter(
          (tempProduct) => tempProduct._id == id
        );

        if (tempProducts.length > 0) {
          // product already exists in the cart
          tempProducts[0].quantity = quantity;
        }
      }

      user.save((error, user) => {
        response.send(utils.createResult(error, user.cart));
      });
    }
  });
});

router.delete("/", (request, response) => {});

module.exports = router;