//get individual job details here

const mongoose = require("mongoose");
const Jobs = require("../../models/jobs/jobSchema");

async function getJobDetails(req, res) {
  const params = req.params;
  const { jobId } = params; //use this jobId to query the DB and get the data from the Db with this jobid

  console.log("individual job details params", jobId);

  try {
    const searchedJob = await Jobs.findOne({ _id: jobId });

    if (!searchedJob || searchedJob.length <= 0) {
      return res.status(400).json({
        message: "Failed to open the job details page",
        status: "Failure",
      });
    }

    console.log(`Job found with ${jobId}: `, searchedJob);

    return res.status(200).json({
      message: "Searched job found with the jobid",
      status: "Success",
      searchedJobs: searchedJob,
    });
  } catch (error) {
    console.error("Error Finding job:", error.message);
    return res.status(500).json({ message: "Server error", status: "Error" });
  }
}

module.exports = getJobDetails;
