const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobCompany: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobSalary: {
      type: Number,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
    },
    jobSkillsRequired: {
      type: [String],
      required: true,
    },
    jobPostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    jobApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
      },
    ],
  },
  { timestamps: true }
);

const Jobs = mongoose.model("jobs", jobSchema);

module.exports = Jobs;
