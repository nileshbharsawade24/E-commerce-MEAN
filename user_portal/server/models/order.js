const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  status: { type: String, default: "CONFIRMED" },
  totalAmount: { type: Number, trim: true, required: true },
  orderDate: { type: Date, default: new Date() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  payment: {
    id: { type: String, trim: true, required: true },
    amount: { type: Number, trim: true, required: true },
    receipt: { type: String, trim: true, required: true },
    sourceId: { type: String, trim: true, required: true },
  },

  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],

  deleted: { type: Boolean, default: false },
  createdTimestamp: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Order", orderSchema);