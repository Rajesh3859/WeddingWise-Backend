const mongoose = require("mongoose");
const { Types } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      required: false,
    },
    subbrand: {
      type: Types.ObjectId,
      required: false,
    },
    brand: {
        type: Types.ObjectId,
        required: false
    },
  },
  { timestamps: true }
);


module.exports = productSchema;
