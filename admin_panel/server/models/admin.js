const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },

    isActive: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    createdTimestamp: { type: Date, default: new Date()}
})

module.exports = mongoose.model('Admin', adminSchema);