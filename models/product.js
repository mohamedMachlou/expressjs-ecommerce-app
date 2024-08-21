const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 32,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    photo: {
      type: Buffer,
      contentType: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    shipping: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", categorySchema);
