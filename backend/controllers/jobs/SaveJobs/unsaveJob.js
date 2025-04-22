const SavedJobs = require("../../../models/SaveJobSchema/saveJobSchema");

async function unsaveJob(req, res) {
  const { userId, jobId } = req.body;

  if (!userId || !jobId) {
    return res.status(400).json({ message: "Fields are missing" });
  }

  //1- check if saved job is present or not

  const jobExist = await SavedJobs.findOne({ userId, jobId });

  if (!jobExist) {
    console.log("saved job is  not present in the DB", jobExist);
    return res.status(400).json({
      message: "Saved job is  not present in the DB",
      status: "NotExist",
    });
  }

  // console.log("Save job exist", jobExist);

  //2- delete the saved job if present
  const deleteSavedJob = await SavedJobs.deleteOne({ userId, jobId });

  if (!deleteSavedJob) {
    console.log("Failed to deleted the saved job from the DB", deleteSavedJob);

    return res.status(400).json({
      message: "Failed to deleted the saved job from the DB",
      status: "Failure",
    });
  }

  // console.log("Successfuly deleted the saved job", deleteSavedJob);

  return res.status(200).json({
    message: "Successfully deleted the saved job from the DB",
    status: "Success",
  });
}

module.exports = unsaveJob;
