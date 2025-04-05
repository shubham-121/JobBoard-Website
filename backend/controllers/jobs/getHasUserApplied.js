const Applicant = require("../../models/ApplicantSchema/applicantSchema");

async function getHasUserApplied(req, res) {
  const params = req.query;
  console.log("has user applied", params);
  try {
    // Your code here
    const hasApplied = await Applicant.findOne({
      jobId: jobId,
      applicantId: userId,
    });

    return res.status(200).json({
      message: "Has user applied",
      hasApplied: hasApplied,
      //   hasApplied: !!found,
    });
  } catch (err) {
    console.error("Error checking application:", err.message);
    return res.status(500).json({ hasApplied: false });
  }
}

module.exports = getHasUserApplied;

//work on this route. on tuesday. If user has already applied , then use this route with the hook in frontend and dont allow the user to upload the resume
