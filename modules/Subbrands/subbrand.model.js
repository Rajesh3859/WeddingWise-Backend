const mongoose = require("mongoose");
const SubBrandSchema = require("./subbrand.schema");

const SubBrandModel = mongoose.model("Subbrand", SubBrandSchema);
module.exports = SubBrandModel;
