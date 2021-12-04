const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String, trim: true, required: false },

    rating: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
            comment: { type: String, required: false }
        }
    ],

    deleted: { type: Boolean, default: false },
    createdTimestamp: { type: Date, default: new Date()}
})

module.exports = mongoose.model('Product', productSchema);