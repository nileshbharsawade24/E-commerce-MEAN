const Category = require('../models/category')
const express = require('express')
const utils = require('../utils')


const router = express.Router()



router.get('/',(request, response)=>{

    Category
        .find({deleted: false},{__v: 0, deleted: 0, isActive: 0, createdTimestamp: 0})
        .exec((error,categories)=>{
            response.send(utils.createResult(error,categories))
        })


})





// router.delete('/:id',(request, response)=>{

//     const id = request.params

//     Category
//         .findOne({_id : id})
//         .exec((error,category)=>{
//             if(error){
//                 response.send(utils.createResult(error, null))
//             }
//             else if(!category){
//                 response.send(utils.createResult('category not found', null))

//             }
//             else{

//                 category.deleted = true
            
//                 category.save((error,category)=>{
//                     response.send(utils.createResult(error,category))
//                 })
//             }
//         })

// })




module.exports = router