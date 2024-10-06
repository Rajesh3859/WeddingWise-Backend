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
    imageUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/467939334/photo/golden-wedding-rings.jpg?s=2048x2048&w=is&k=20&c=v-YzoJgBPtQbH5s6QgYg-kEF5fbyNFOkpE2lhdVEqBY=",
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
