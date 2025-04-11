//schema for storing saved jobs of each users

const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
  },
  { timestamps: true }
);

const SavedJobs = mongoose.model("savedJobs", savedJobSchema);

module.exports = SavedJobs;
