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
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSignupSchema);

module.exports = Users;
