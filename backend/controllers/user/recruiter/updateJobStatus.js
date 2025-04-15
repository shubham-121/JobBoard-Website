//this route updates the job status of the application by the recruiter

const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const Jobs = require("../../../models/jobs/jobSchema");

async function updateJobStatus(req, res) {
  const { jobId, applicantId } = req.params;

  console.log("updateJobStatus:", RenderJobDetails, applicantId);

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

module.exports = updateJobStatus;

//roll back if anything goes wrong.
//only  this file is created, and included in index.js. Nothing after that has been changed
