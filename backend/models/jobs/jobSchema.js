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
      //refer to new schema (applicationsSchema)
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
      },
    ],

    //optional extra fields
    experienceRequired: {
      type: String,
      required: false,
    }, // e.g., "2-5 years"
    applicationDeadline: {
      type: Date,
      required: false,
    }, // e.g., "2025-04-30"
    hiringProcess: {
      type: [String],
      required: false,
    }, // e.g., "Resume Screening -> Coding Test -> Interview"
    jobBenefits: {
      type: [String],
      required: false,
    }, // e.g., ["Health Insurance", "Paid Leave"]
  },

  { timestamps: true }
);

const Jobs = mongoose.model("jobs", jobSchema);

module.exports = Jobs;
