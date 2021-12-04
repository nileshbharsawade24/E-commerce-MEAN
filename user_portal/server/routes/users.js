const express = require('express')
const User = require('../models/user')
const crypto = require('crypto-js')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const stripe = require('stripe')(config.stripeSecret)


const router = express.Router()

router.post("/signup", (request, response) => {
    const { firstName, lastName, password, email, phone } = request.body;
  
    stripe.customers
      .create({
        name: `${firstName} ${lastName}`,
        description: "mystore user",
        email: email,
        address: {
          city: "Nanded",
          country: "india",
          line1: ""+email,
          line2: "line2",
          postal_code: 431605,
          state: "maharashtra",
        },
      })
      .then((customer) => {
        console.log(customer);
  
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = crypto.MD5(password);
        user.email = email;
        user.phone = phone;
        user.stripeId = customer.id;
  
        // a new document will be created inside admins collection
        user.save((error, user) => {
          response.send(utils.createResult(error, user));
        });
      });
  });

router.post('/signin',(request,response)=>{
    const {password, email} = request.body
    
    const encryptedPassword = '' + crypto.MD5(password)

    User
        .findOne({email: email, password: encryptedPassword},{__v:0, deleted: 0, password: 0, createdTimestamp:0})
        .exec((error, user)=>{
            if(error){
                response.send(utils.createResult(error, null))
            }
            else if(!user){
                response.send(utils.createResult('invalid email or password', null))

            }
            else{
                if(!user.isActive){
                    response.send(utils.createResult('your account is suspended.. please contact admin'))
                    return;
                }



                const payload={
                    id: user._id,
                    name:user.firstName+' '+user.lastName
                }

                const token=jwt.sign(payload, config.secret)

                response.send(utils.createResult(error, {
                    name: user.firstName+' '+user.lastName,
                    email: user.email,
                    phone: user.phone,
                    token: token
                }))
            }
        })



})


module.exports = router