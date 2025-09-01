const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"], //email validation
    },

    userPhoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userCity: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
      enum: ["Recruiter", "Job Seeker"],
    },

    //optional fields

    //1-for job seeker
    userHeadline: {
      //short info about the user
      type: String,
    },
    userSocial: {
      type: String,
    },
    userYoe: {
      type: String,
    },

    userResume: {
      type: String,
    },
    userSkills: {
      type: [String],
    },
    userExperience: [
      {
        companyName: { type: String },
        yoe: { type: String },
        jobTitle: { type: String },
        duration: { type: String }, // e.g. "Jan 2021 - Dec 2023"
        location: { type: String },
        description: { type: String }, // what they worked on, achievements
        technologies: [String], // optional
      },
    ],

    userEducation: [
      {
        instituteName: { type: String },
        from: { type: Date },
        to: { type: Date },
        degree: { type: String },
        duration: { type: String },
      },
    ],

    userProjects: [
      {
        projectName: { type: String },
        description: { type: String },
        technologiesUsed: { type: [String] },
        startDate: { type: Date },
        endDate: { type: Date }, // Optional, because some projects might be ongoing
        role: { type: String },
        link: { type: String },
        duration: { type: String },
      },
    ],

    //2-for recruiter
    recruiterProfile: {
      companyName: { type: String },
      companyWebsite: { type: String },
      aboutCompany: { type: String },
      designation: { type: String },
      linkedInProfile: { type: String },
      companyLogo: { type: String }, // optional: for branding
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSignupSchema);

module.exports = Users;
