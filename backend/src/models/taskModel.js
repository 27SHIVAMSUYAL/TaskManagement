const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      trim: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Only allows these values
      default: "medium", // Default priority
    },
    deadline: {
      type: Date,
      required: false, // Optional, but you can set it to required: true
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("task", Schema);

module.exports = model;
