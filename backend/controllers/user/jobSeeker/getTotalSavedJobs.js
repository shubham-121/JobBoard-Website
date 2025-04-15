// get details of all the jobs applied by the user
const SavedJobs = require("../../../models/SaveJobSchema/saveJobSchema");
const mongoose = require("mongoose");

async function getTotalSavedJobs(req, res) {
  const { userId } = req.params;

  console.log("getTotalSavedJobs:", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Invalid or missing userId",
      status: "Failure",
    });
  }

  try {
    const savedJobs = await SavedJobs.find({ userId: userId }).populate({
      path: "jobId",
      select:
        "jobTitle jobDescription jobCompany jobLocation jobSkillsRequired",
    });

    //if anything breaks delete the above query and use the query below
    // const savedJobs = await SavedJobs.find({ userId: userId }).populate(
    //   "jobId"
    // );

    if (!savedJobs || savedJobs.length <= 0) {
      return res.status(200).json({
        message: "No jobs found for the logged in user",
        status: "NotFound",
        savedJobs: savedJobs,
      });
    }

    console.log("All jobs saved by the user: ", savedJobs);

    return res.status(200).json({
      message: "All jobs found for the logged in user",
      status: "Success",
      savedJobs: savedJobs,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(200).json({
      message: "Error occured while finding the applied jobs by the user",
      status: "Error",
    });
  }
}

module.exports = getTotalSavedJobs;
