const mongoose = require("mongoose");
const Jobs = require("../../models/jobs/jobSchema");

async function getJobs(req, res) {
  const { jobtitle, location, keywords } = req.params;

  console.log("User required job: ", jobtitle, location, keywords);

  //creating a filter to query the Db
  const filter = {};
  //if jobtitle, get all jobs with same title as user entered
  if (jobtitle) filter.jobTitle = jobtitle;

  //if location, get all jobs according to user location
  if (location) filter.jobLocation = location;

  //if keywords, get all jobs accodring to the user keywords
  if (keywords)
    filter.jobSkillsRequired = { $regex: `${keywords}`, $options: "i" }; //match given keyword in the array of jobskillsrequired

  try {
    const allJobs = await Jobs.find(filter);
    if (!allJobs || allJobs.length <= 0) {
      return res.status(400).json({ message: "No jobs present currently" });
    }

    console.log(`All jobs found with filter:  ${filter}->`, allJobs);

    return res.status(200).json({
      message: "All jobs found!",
      resultLength: allJobs.length,

      searchedJobs: allJobs,
    });
  } catch (error) {
    console.error("Error Finding job:", error.message);
    return res.status(500).json({ message: "Server error", status: "Error" });
  }

  //if no params, get all jobs from model

  //get all jobs first by title
  return res.status(200).json({ message: "Get jobs route" });
}

module.exports = getJobs;

// Note: store the string in frontend as an array of single string like this:  [ 'Java, Spring Boot, Kubernetes, GCP' ],. otherwise refex will fails searching this with the keyword java
