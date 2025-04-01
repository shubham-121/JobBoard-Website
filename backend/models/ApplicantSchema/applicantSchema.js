const mongoose = require("mongoose");

//only for recruiter
const applicantSchema = mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },

    applicantId: {
      //store applicants user id(for job seekers)
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Job poster's ID
      required: true,
    },

    //for tracking all the applicants related to one company and job title for faster querying
    jobTitle: {
      type: String,
      required: true,
    },

    jobCompany: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Shortlisted", "Rejected", "Selected"],
      default: "Pending",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    coverLetter: {
      type: String,
    },

    resumeUrl: {
      type: String,
    },

    notes: {
      type: String, // Recruiter can add comments
    },
  },
  { timestamps: true }
);

const Applicant = new mongoose.model("applicants", applicantSchema);

module.exports = Applicant;
