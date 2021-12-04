const express = require('express')
const Product = require('../models/product')
const utils = require('../utils')
const fs = require("fs");


const router = express.Router()




router.get("/image/:filename", (request, response) => {
    const { filename } = request.params;
    const path = __dirname + "/../images/" + filename;
    console.log(path);
    fs.readFile(path, (error, data) => {
      response.send(data);
    });
  });

  

router.get('/', (request, response) => {
    Product
        .find({deleted: false}, {__v: 0, deleted: 0, isActive: 0, createdTimestamp: 0})
        .populate('category', 'title _id')
        .exec((error, products) => {
            response.send(utils.createResult(error, products))
        })
})








module.exports = router