const mongoose = require("mongoose");

const { Types } = require("mongoose");
const SubBrandSchema = mongoose.Schema(
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
    brand: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SubBrandSchema;
