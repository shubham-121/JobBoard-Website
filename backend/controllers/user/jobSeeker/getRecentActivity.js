// get user recent activity
const Applicant = require("../../../models/ApplicantSchema/applicantSchema");
const SavedJobs = require("../../../models/SaveJobSchema/saveJobSchema");
const Users = require("../../../models/UserSchema/userSignup");
const mongoose = require("mongoose");

async function getRecentActivity(req, res) {
  const { userId } = req.params;

  console.log("getRecentActivity:", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid or missing userId",
      status: "Failure",
    });
  }

  try {
    //1- get the user applied job activity (latest ->so we fetch in descending order -1)
    const appliedJobsActivity = await Applicant.find({ applicantId: userId })
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .populate("jobId");

    //2- get the user saved job activity (latest ->so we fetch in descending order -1)
    const savedJobsActivity = await SavedJobs.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("jobId");

    //3- profile updated also add
    //find the difference on the basis of createdAt and updatedAt. IF both differ, then user updated his profile

    const updatedProfileActivity = await Users.findById({ _id: userId });
    const createdAt = new Date(updatedProfileActivity.createdAt);
    const updatedAt = new Date(updatedProfileActivity.updatedAt);

    const profileUpdated = createdAt.getTime() !== updatedAt.getTime();

    // console.log("Difference is:", createdAt, updatedAt, profileUpdated);

    console.log("updated user profile activity:", updatedProfileActivity);

    //4- resume updated also add

    //return if both arrays are missing
    if (
      (!appliedJobsActivity || appliedJobsActivity.length === 0) &&
      (!savedJobsActivity || savedJobsActivity.length === 0)
    ) {
      return res.status(200).json({
        message: "No activity found for the logged in user",
        status: "NotFound",
        userRecentActivity: { appliedJobsActivity, savedJobsActivity },
      });
    }

    //if any one of the array is available, is proceeds further

    console.log(
      `${appliedJobsActivity.length}-> recent applied activity of the user:`,
      appliedJobsActivity
    );

    console.log(
      `${savedJobsActivity.length}-> recent saved activity of the user:`,
      savedJobsActivity
    );

    return res.status(200).json({
      message: "All user activity found for the logged in user",
      status: "Success",
      userRecentActivity: {
        appliedJobsActivity,
        savedJobsActivity,
        updatedProfileActivity: profileUpdated //send response if profile is updated based on difference btw createdAt and updatedAt
          ? "You Updated Your Profile"
          : "",
      },
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(200).json({
      message: "Error occured while finding the user activity",
      status: "Error",
    });
  }
}

module.exports = getRecentActivity;
