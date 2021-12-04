const express = require('express')
const Admin = require('../models/admin')
const crypto = require('crypto-js')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const router = express.Router()

router.post('/signup',(request,response)=>{
    const {firstName, lastName, password, email, phone} = request.body
    
    const admin = new Admin()
    admin.firstName = firstName
    admin.lastName = lastName
    admin.password = crypto.MD5(password)
    admin.email = email
    admin.phone = phone

    //saved inside admins collection
    admin.save((error,admin)=>{
        response.send(utils.createResult(error,admin))
    })


})

router.post('/signin',(request,response)=>{
    const {password, email} = request.body
    
    const encryptedPassword = '' + crypto.MD5(password)

    Admin
        .findOne({email: email, password: encryptedPassword},{__v:0, deleted: 0, password: 0, createdTimestamp:0})
        .exec((error, admin)=>{
            if(error){
                response.send(utils.createResult(error, null))
            }
            else if(!admin){
                response.send(utils.createResult('invalid email or password', null))

            }
            else{
                const payload={
                    id: admin._id,
                    name:admin.firstName+' '+admin.lastName
                }

                const token=jwt.sign(payload, config.secret)

                response.send(utils.createResult(error, {
                    name: admin.firstName+' '+admin.lastName,
                    email: admin.email,
                    phone: admin.phone,
                    token: token
                }))
            }
        })



})


module.exports = router