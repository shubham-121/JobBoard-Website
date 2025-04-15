// get details of all the jobs applied by the user
const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const mongoose = require("mongoose");

async function getTotalAppliedJobs(req, res) {
  const { userId } = req.params;

  console.log("getTotalAppliedJobs:", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid or missing userId",
      status: "Failure",
    });
  }

  try {
    const appliedJobs = await Applicant.find({ applicantId: userId });

    if (!appliedJobs || appliedJobs.length <= 0) {
      return res.status(200).json({
        message: "No jobs found for the logged in user",
        status: "NotFound",
        appliedJobs: appliedJobs,
      });
    }

    // console.log("All jobs applied by the user: ", appliedJobs);

    return res.status(200).json({
      message: "All jobs found for the logged in user",
      status: "Success",
      appliedJobs: appliedJobs,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(200).json({
      message: "Error occured while finding the applied jobs by the user",
      status: "Error",
    });
  }
}

module.exports = getTotalAppliedJobs;
