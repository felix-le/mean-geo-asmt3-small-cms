const mongoose = require('mongoose');

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
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Projects', projectsSchema);
