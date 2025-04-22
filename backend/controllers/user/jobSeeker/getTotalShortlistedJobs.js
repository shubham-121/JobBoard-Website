// get details of all the shortlisted jobs applied by the user
const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const mongoose = require("mongoose");

async function getTotalShortlistedJobs(req, res) {
  const { userId } = req.params;

  // console.log("getTotalShortlistedJobs:", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid or missing userId",
      status: "Failure",
    });
  }

  try {
    const shortlistedJobs = await Applicant.find({
      applicantId: userId,
      status: { $in: ["Selected", "Shortlisted", "Reviewed"] },
    });

    console.log("Shortlisted job:", shortlistedJobs);
    console.log("Shortlisted job:", shortlistedJobs.length);

    if (!shortlistedJobs || shortlistedJobs.length <= 0) {
      return res.status(200).json({
        message: "No jobs found for the logged in user",
        status: "NotFound",
        shortlistedJobs: shortlistedJobs,
      });
    }

    // console.log("All jobs applied by the user: ", shortlistedJobs);

    return res.status(200).json({
      message: "All jobs found for the logged in user",
      status: "Success",
      count: shortlistedJobs.length,
      shortlistedJobs: shortlistedJobs,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(200).json({
      message: "Error occured while finding the applied jobs by the user",
      status: "Error",
    });
  }
}

module.exports = getTotalShortlistedJobs;
