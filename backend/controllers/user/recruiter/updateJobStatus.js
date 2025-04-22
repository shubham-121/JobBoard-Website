//this route updates the job status of the application by the recruiter

const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const Jobs = require("../../../models/jobs/jobSchema");
const mongoose = require("mongoose");

async function updateJobStatus(req, res) {
  const { jobId, applicantId } = req.params;
  const { status } = req.body;

  console.log("updateJobStatus:", jobId, applicantId, status);

  if (
    !jobId ||
    !applicantId ||
    !mongoose.Types.ObjectId.isValid(jobId) ||
    !mongoose.Types.ObjectId.isValid(applicantId)
  ) {
    return res.status(400).json({
      message: "Invalid or missing jobId/applicantId",
      status: "Failure",
    });
  }

  //   job status state- ["Pending", "Reviewed", "Shortlisted", "Rejected", "Selected"],

  try {
    const filter = { jobId, applicantId };
    const updateValue = { status: status };
    const statusChange = await Applicant.findOneAndUpdate(filter, updateValue, {
      new: true,
    });

    if (!statusChange || statusChange.length <= 0) {
      return res.status(400).json({
        message: "Failed to update the job status of the user",
        status: "Failure",
        statusChange: statusChange,
      });
    }

    console.log("Job status updated: ", statusChange);

    return res.status(200).json({
      message: "Job status of the user updated",
      status: "Success",
      statusChange: statusChange,
    });
  } catch (error) {
    console.error(
      "Error occured while updating the job status:",
      error.message
    );

    return res.status(500).json({
      message: "Error occured while updating the job status",
      status: "Error",
    });
  }
}

module.exports = updateJobStatus;

//roll back if anything goes wrong.
//only  this file is created, and included in index.js. Nothing after that has been changed
