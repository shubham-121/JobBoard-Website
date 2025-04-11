const Applicant = require("../../models/ApplicantSchema/applicantSchema");

async function getHasUserApplied(req, res) {
  const { userId, jobId } = req.query;
  console.log("has user applied before", userId, jobId);
  try {
    // Your code here
    const hasApplied = await Applicant.findOne({
      jobId: jobId,
      applicantId: userId,
    });

    console.log("has applied query data", hasApplied);

    //user already applied
    if (hasApplied) {
      return res.status(200).json({
        message: "User has already applied to this job",
        hasApplied: hasApplied,
        hasAppliedStatus: true,

        //   hasApplied: !!found,
      });
    } else {
      //user not applied

      return res.status(200).json({
        message: "Current user has not applied",
        hasAppliedStatus: false,
      });
    }
  } catch (err) {
    console.error("Error checking application:", err.message);
    return res.status(500).json({ hasApplied: false });
  }
}

module.exports = getHasUserApplied;

//work on this route. on tuesday. If user has already applied , then use this route with the hook in frontend and dont allow the user to upload the resume
//also work on dashboard for both recruiter and the user
//then work on the application tracking system for both
