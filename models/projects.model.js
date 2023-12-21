const mongoose = require("mongoose");

let projectsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    client: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    technologies: {
      type: Object,
    },
    link: {
      type: String,
    },
    img: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", projectsSchema);
