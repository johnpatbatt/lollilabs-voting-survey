const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
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
    gallery: {
      type: String,
      maxlength: 500,
    },
    featuredImage: {
      type: String,
      maxlength: 100,
    },
    description: {
      type: String,
    },
    score: {
      type: String,
      default: "10",
    },
    votingScoreDescription: {
      type: String,
      maxlength: 50,
    },
    firstname: {
      type: String,
      maxlength: 50,
    },
    laststname: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
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

module.exports = mongoose.model("productSchema", productSchema);
