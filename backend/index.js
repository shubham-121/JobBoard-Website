const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

require("dotenv").config();

const connectToDB = require("./connection.js");

//Models files
const Jobs = require("./models/jobs/jobSchema.js");

//controllers files
// 1- auth files
const userSignup = require("./controllers/auth/signup.js");
const loginUser = require("./controllers/auth/login.js");
const verifyJwt = require("./controllers/auth/verifyJwt.js");

// 2- jobs files
const createJob = require("./controllers/jobs/createJob.js");
const getJobs = require("./controllers/jobs/getJobs.js");
const getJobDetails = require("./controllers/jobs/getJobDetails.js");
const getApplicationCount = require("./controllers/jobs/getApplicationCount.js");
const getHasUserApplied = require("./controllers/jobs/getHasUserApplied.js");

//apply job file (multer)
const applyJob = require("./controllers/jobs/applyJob.js");
const upload = require("./controllers/jobs/multer/multerConfig.js");
const uploadResume = require("./controllers/jobs/multer/uploadResume.js");

//save jobs files
const checkJobSaved = require("./controllers/jobs/SaveJobs/checkJobSaved.js");
const saveJob = require("./controllers/jobs/SaveJobs/saveJob.js");
const unsaveJob = require("./controllers/jobs/SaveJobs/unsaveJob.js");

//user files for dashboard
const userProfile = require("./controllers/user/profile.js");
//for job seeker
const getTotalAppliedJobs = require("./controllers/user/jobSeeker/getTotalAppliedJobs.js");
const getTotalSavedJobs = require("./controllers/user/jobSeeker/getTotalSavedJobs.js");
const getRecentActivity = require("./controllers/user/jobSeeker/getRecentActivity.js");
//for recuiter
const getJobsPosted = require("./controllers/user/recruiter/getJobsPosted.js");
const getApplicants = require("./controllers/user/recruiter/getApplicants.js");
const updateJobStatus = require("./controllers/user/recruiter/updateJobStatus.js");

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "This is the index route" });
});

//1- user login/signup route
app.post("/api/auth/signup", userSignup);
app.post("/api/auth/login", loginUser);

//2-user profile routes (route for custom hooks also)
app.get("/api/user/profile", verifyJwt, userProfile);
//for the job seekers
app.get("/api/users/:userId/appliedJobs", verifyJwt, getTotalAppliedJobs);
app.get("/api/users/:userId/savedJobs", verifyJwt, getTotalSavedJobs);
app.get("/api/users/:userId/activities", verifyJwt, getRecentActivity);

//for the recruiter
app.get("/api/recruiters/:recruiterId/jobs", verifyJwt, getJobsPosted);
app.get("/api/recruiters/:recruiterId/applicants", verifyJwt, getApplicants);
//prettier-ignore
app.patch("/api/jobs/:jobId/applicants/:applicantId/status", verifyJwt,updateJobStatus);

//2- job apply /save route
app.post("/api/jobs/apply", verifyJwt, applyJob);

//3- upload resume route
app.post(
  "/api/jobs/apply/resume",
  verifyJwt,
  upload.single("resume"),
  uploadResume
);

//4- get the job applicant count route
app.get("/api/jobs/:jobId/applicants", getApplicationCount);
//5- check if user has already applied
app.get("/api/applications/hasApplied", getHasUserApplied);

//6- save job for users
app.get("/api/jobs/checkJobSaved", verifyJwt, checkJobSaved);
app.post("/api/jobs/saveJob", verifyJwt, saveJob);
app.delete("/api/jobs/unsave", verifyJwt, unsaveJob);

//7- job posting route
app.post("/api/jobs", verifyJwt, createJob); //create a new job
app.get("/api/jobs", getJobs); //get all jobs
app.get("/api/jobs/:jobId", getJobDetails); //get individual job details

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is running on port:${PORT}`));
