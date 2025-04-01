//user route for applying to a job

const Applicant = require("../../models/ApplicantSchema/applicantSchema");

async function applyJob(req, res) {
  const body = req.body;

  const { jobId, applicantId, recruiterId, jobTitle, jobCompany } = body;

  console.log("Job applicant apply data", body);

  if (!jobId || !applicantId || !recruiterId || !jobTitle || !jobCompany) {
    return res.status(400).json({
      message: "Error in applying, some fields are missing",
      status: "Error",
    });
  }

  //1- now check whether the user has already applied to this job or not. If yes, change applied btn on frontend

  const alreadyApplied = await Applicant.findOne({
    applicantId: applicantId,
    jobId: jobId,
  });

  if (alreadyApplied) {
    console.log("User  already applied to the job:", alreadyApplied);

    return res.status(200).json({
      message: "User already has applied to the job",
      alreadyApplied: alreadyApplied,
      status: "Already Applied",
    });
  }

  //2-store the applicant detils in the DB
  try {
    const newApplication = await Applicant.create({
      jobId: jobId,
      applicantId: applicantId,
      recruiterId: recruiterId,
      jobTitle: jobTitle,
      jobCompany: jobCompany,
    });

    if (!newApplication) {
      return res.status(402).json({
        message: "Error in applying, to the job. Try again",
        status: "Error",
      });
    }

    console.log("Successfully applied to the job: ", newApplication);

    return res.status(200).json({
      message: "You have successfully applied to the job",
      status: "Success",
      newApplication: newApplication,
    });
  } catch (err) {
    console.error("Error in applying, to the job. Try again", err.message);
    return res.status(500).json({
      message: "Error in applying, to the job. Try again",
      status: "Failure",
    });
  }
}

module.exports = applyJob;
