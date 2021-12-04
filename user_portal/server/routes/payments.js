const express = require('express')
const User = require('../models/user')
const crypto = require('crypto-js')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const stripe = require('stripe')(config.stripeSecret)
const Order = require("../models/order");

const router = express.Router()
//from here
function funcion2(to, rec) {
  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bharsawadenilesh24@gmail.com',
      pass: 'NeelRadha2'
    }
  });

  var mailOptions = {
    from: 'bharsawadenilesh24@gmail.com',
    to: ''+to,
    subject: 'Order succesfull',
    text: 'please check the receipt on portal!',
    html:'<p> please check the receipt: <br>'+rec+'</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
//to here

router.post("/charge", (request, response) => {
    (async () => {
      const { source, amount } = request.body;
  
      User.findOne(
        { _id: request.userId },
        { __v: 0, deleted: 0, password: 0, createdTimestamp: 0 }
      ).exec(async (error, user) => {
        if (error) {
          response.send(utils.createResult(error, null));
        } else if (!user) {
          response.send(utils.createResult("invalid email or password", null));
        } else {
          const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: "inr",
            source: source,
            description: "payment for order",
            customer: user.stripeId,
          });
  
          console.log(charge);
  
          const order = new Order();
          order.totalAmount = amount;
          order.user = request.userId;
          order.payment = {
            id: charge.id,
            amount: charge.amount,
            receipt: charge.receipt_url,
            sourceId: source,
          };
  
          order.products = user.cart;
          await order.save();

          //from here
          console.log(user.email)
          funcion2(''+user.email,charge.receipt_url)
          //to here
  
          // remove all the items from the cart
          user.cart = [];
          await user.save();
  
           response.send(utils.createResult(null, "done"));
        }
      });
    })();
  });

module.exports = router