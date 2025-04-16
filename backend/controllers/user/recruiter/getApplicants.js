// get job applicants for the custom hook
const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const mongoose = require("mongoose");

async function getApplicants(req, res) {
  const { recruiterId } = req.params;

  //   console.log("Recruite id getApplicants route:", recruiterId);

  if (!recruiterId || !mongoose.Types.ObjectId.isValid(recruiterId)) {
    return res.status(400).json({
      message: "Invalid or missing recruiterId",
      status: "Failure",
    });
  }

  try {
    const jobApplicants = await Applicant.find({
      recruiterId: recruiterId,
    })
      .sort({ appliedAt: -1 })
      .populate("applicantId")
      .populate("jobId");

    // console.log("All applicants for the posted job: ", jobApplicants);

    if (!jobApplicants || jobApplicants.length <= 0) {
      return res.status(200).json({
        message: "No Job Applicants found for the logged in user",
        status: "NotFound",
        jobApplicants: jobApplicants,
      });
    }

    return res.status(200).json({
      message: "All job applicants found for the logged in user",
      status: "Success",
      jobApplicants: jobApplicants,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(200).json({
      message: "Error occured while finding the applicants for the job",
      status: "Error",
    });
  }
}

module.exports = getApplicants;
