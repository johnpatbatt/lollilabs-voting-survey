const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productTwoInfo = new Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    title: {
      type: String,
      maxlength: 50,
    },
    handle: {
      type: String,
      maxlength: 50,
    },
    price: {
      type: String,
      maxlength: 50,
    },
    featuredImage: {
      type: String,
      maxlength: 100,
    },
    info: {
      type: Object,
    },
  },
  { _id: true },
  { strict: true },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("productTwoInfo", productTwoInfo);
