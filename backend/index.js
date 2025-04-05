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

//apply job file (multer)
const applyJob = require("./controllers/jobs/applyJob.js");

const upload = require("./controllers/jobs/multer/multerConfig.js");
const uploadResume = require("./controllers/jobs/multer/uploadResume.js");

//user files
const userProfile = require("./controllers/user/profile.js");

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

app.get("/api/user/profile", verifyJwt, userProfile);

//2- job posting route
app.post("/api/jobs", verifyJwt, createJob); //create a new job
app.get("/api/jobs", getJobs); //get all jobs
app.get("/api/jobs/:jobId", getJobDetails); //get individual job details

//3- job apply /save route
app.post("/api/jobs/apply", verifyJwt, applyJob);

//4- upload resume route
app.post(
  "/api/jobs/apply/resume",
  verifyJwt,
  upload.single("resume"),
  uploadResume
);

//5- get the job applicant count route
app.get("/api/jobs/:jobId/applicants", getApplicationCount);
//6- check if user has already applied
app.get("/api/jobs/:jobId/has-applied");

// app.post("/api/jobs/apply/resume", upload.single("resume"), uploadResume);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is running on port:${PORT}`));
