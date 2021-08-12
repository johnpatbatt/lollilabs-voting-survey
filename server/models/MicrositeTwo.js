const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const micrositeTwo = new Schema(
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
    featuredImage: {
      type: String,
      maxlength: 100,
    },
    score: {
      type: String,
      maxlength: 10,
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

module.exports = mongoose.model("micrositeTwo", micrositeTwo);
