const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const micrositeOne = new Schema(
  {
    id: {
      type: String,
      maxlength: 50,
    },
    title: {
      type: String,
      maxlength: 50,
    },
    handle: {
      type: String,
      maxlength: 50,
    },
    score: {
      type: Number,
    },
    survey: {
      type: String,
      maxlength: 50,
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

module.exports = mongoose.model("micrositeOne", micrositeOne);
