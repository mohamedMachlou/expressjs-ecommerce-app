const { required } = require("joi");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 150,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
