const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },

    isActive: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    createdTimestamp: { type: Date, default: new Date()}
})

module.exports = mongoose.model('Category', categorySchema);