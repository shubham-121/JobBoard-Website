const SavedJobs = require("../../../models/SaveJobSchema/saveJobSchema");

async function checkJobSaved(req, res) {
  const { userId, jobId } = req.query;

  if (!userId || !jobId) {
    console.error("user id / job id missing", userId, jobId);
    return res.status(400).json({ message: "All fields are required" });
  }

  //1- check for the saved job in DB
  const alreadyExists = await SavedJobs.findOne({ userId, jobId });
  if (alreadyExists) {
    console.log("job already saved in the DB", alreadyExists);
    return res.status(200).json({
      message: "Job already saved in the DB",
      status: "AlreadyExists",
    });
  }

  console.log("Job exists?", alreadyExists);

  return res
    .status(200)
    .json({ message: "Saved job not found in DB", status: "NotExist" });
}

module.exports = checkJobSaved;
