const express = require('express')
const User = require('../models/user')
const utils = require('../utils')
const router = express.Router()

router.get('/', (request, response) => {
    User
        .find({deleted: false}, {__v: 0, deleted: 0, createdTimestamp: 0})
        .exec((error, users) => {
            response.send(utils.createResult(error, users))
        })
})

router.patch('/:id/status', (request, response) => {
    const { id } = request.params
    const { status } = request.body
    
    User
        .findOne({ _id: id, deleted: false})
        .exec((error, user) => {
            if (error) {
                response.send(utils.createResult(error, null))
            } else if (!user) {
                response.send(utils.createResult('user not found', null))
            } else {
                user.isActive = status
                user.save((error, user) => {
                    response.send(utils.createResult(error, user))
                })
            }
        })    
})


router.delete('/:id', (request, response) => {
    const { id } = request.params
    
    User
        .findOne({ _id: id})
        .exec((error, user) => {
            if (error) {
                response.send(utils.createResult(error, null))
            } else if (!user) {
                response.send(utils.createResult('user not found', null))
            } else {
                user.deleted = true
                user.save((error, user) => {
                    response.send(utils.createResult(error, user))
                })
            }
        })    
})


module.exports = router