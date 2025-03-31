const Jobs = require("../../models/jobs/jobSchema");

async function createJob(req, res) {
  const body = req.body;

  // const user = req.user;
  // console.log("user from post job route:", user);

  const {
    jobTitle,
    jobDescription,
    jobCompany,
    jobLocation,
    jobSalary,
    jobType,
    jobSkillsRequired,
    jobPostedBy,

    //extra fields
    experienceRequired,
    applicationDeadline,
    hiringProcess,
    jobBenefits,
  } = body;

  //experienceRequired , applicationDeadline; , hiringProcess; , jobBenefits;

  console.log("job route body:", body);

  //prettier-ignore
  if ([jobTitle, jobDescription, jobCompany, jobLocation, jobSalary, jobType, jobSkillsRequired, jobPostedBy, experienceRequired , applicationDeadline , hiringProcess , jobBenefits ].some(field => !field)) {
  return res.status(400).json({ message: "All fields are required" });
}

  //here extract the user._id from decoding the jwt and then send to the DB

  try {
    //if skills is array, separate the all skills
    const formattedSkills = jobSkillsRequired
      ? Array.isArray(jobSkillsRequired)
        ? jobSkillsRequired.flatMap((skill) =>
            skill.split(",").map((s) => s.trim())
          )
        : jobSkillsRequired.split(",").map((s) => s.trim())
      : [];

    const newJob = await Jobs.create({
      jobPostedBy: jobPostedBy, //current user _id (recruiter who posts the job, send the userId from frontend, using userAuthData), mandatory field for job poster
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      jobCompany: jobCompany,
      jobLocation: jobLocation,
      jobSalary: jobSalary,
      jobType: jobType,
      jobSkillsRequired: formattedSkills,
      // jobPostedBy: "67e507a584d397bc5b8654fb",  //for testing omly use this, instead of jobpostedBy for simplicity
      // jobApplicants: "67e4fc45e5316415cc482df4",

      // Optional fields, only add if provided
      ...(experienceRequired && { experienceRequired: experienceRequired }),
      ...(applicationDeadline && { applicationDeadline: applicationDeadline }),
      ...(hiringProcess && { hiringProcess: hiringProcess }),
      ...(jobBenefits && { jobBenefits: jobBenefits }),
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
