const Jobs = require("../../models/jobs/jobSchema");

async function createJob(req, res) {
  const body = req.body;

  const {
    jobTitle,
    jobDescription,
    jobCompany,
    jobLocation,
    jobSalary,
    jobType,
    jobSkillsRequired,
    jobPostedBy,
    jobApplicants,
  } = body;

  //prettier-ignore
  if ([jobTitle, jobDescription, jobCompany, jobLocation, jobSalary, jobType, jobSkillsRequired, jobPostedBy, jobApplicants].some(field => !field)) {
  return res.status(400).json({ message: "All fields are required" });
}

  //here extract the user._id from decoding the jwt and then send to the DB

  try {
    const newJob = await Jobs.create({
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      jobCompany: jobCompany,
      jobLocation: jobLocation,
      jobSalary: jobSalary,
      jobType: jobType,
      jobSkillsRequired: jobSkillsRequired,
      jobPostedBy: "67e507a584d397bc5b8654fb", //current user _id, use jwt to get _id
      jobApplicants: "67e4fc45e5316415cc482df4",
    });

    if (!newJob) {
      return res.status(400).json({
        message: "Error in creating the job, check and try again!",
        status: "Failed",
        newJob: newJob,
      });
    }

    console.log("Create job body", body);

    return res.status(200).json({
      message: "Job has been successfully created!",
      newJob: newJob,
      status: "Success",
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    return res.status(500).json({ message: "Server error", status: "Error" });
  }
}

module.exports = createJob;

//add trim() in frontend
