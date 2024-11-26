const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = BrandSchema;
