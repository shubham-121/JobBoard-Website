const Applicant = require("../../models/ApplicantSchema/applicantSchema");

async function getApplicationCount(req, res) {
  const { jobId } = req.params;
  console.log("Params for application route:", jobId);

  try {
    // Your code here
    const totalApplicants = await Applicant.countDocuments({ jobId });

    if (!totalApplicants) {
      return res.status(400).json({
        message: "Applications count for current job failed",
        count: totalApplicants,
      });
    }

    console.log("Total applicants count:", totalApplicants);

    return res.status(200).json({
      message: "Applications count for current job fetched",
      count: totalApplicants,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(400).json({
      message: "Applications count for current job failed",
      count: totalApplicants,
    });
  }
}

module.exports = getApplicationCount;

//fetch the application count, then use the applicationcount hook in the frontend in the RenderJobDetails page,
