const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: false },

    stripeId: { type: String, trim:true, required: true},

    cart: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, default: 1 },
        },
      ],
    
    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    createdTimestamp: { type: Date, default: new Date()}
})

module.exports = mongoose.model('User', userSchema);