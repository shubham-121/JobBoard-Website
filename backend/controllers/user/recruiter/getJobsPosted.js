// get details of all the jobs applied by the user
const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const Jobs = require("../../../models/jobs/jobSchema");
const mongoose = require("mongoose");

async function getJobsPosted(req, res) {
  const { recruiterId } = req.params;

  //   console.log("getJobsPosted:", recruiterId);

  if (!recruiterId || !mongoose.Types.ObjectId.isValid(recruiterId)) {
    return res.status(400).json({
      message: "Invalid or missing recruiterId",
      status: "Failure",
    });
  }

  try {
    const jobsPosted = await Jobs.find({ jobPostedBy: recruiterId });

    if (!jobsPosted || jobsPosted.length <= 0) {
      return res.status(200).json({
        message: "No jobs found posted by the logged in user",
        status: "NotFound",
        jobsPosted: jobsPosted,
      });
    }

    // console.log("All jobs posted  by the recruiter: ", jobsPosted);

    return res.status(200).json({
      message: "All jobs found  posted by the logged in user",
      status: "Success",
      jobsPosted: jobsPosted,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(200).json({
      message: "Error occured while finding the  posted jobs by the user",
      status: "Error",
    });
  }
}

module.exports = getJobsPosted;
