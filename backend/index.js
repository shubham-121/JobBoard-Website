const express = require("express");
const cors = require("cors");
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
app.post("/api/jobs", createJob); //create a new job
app.get("/api/jobs/:jobtitle?/:location?/:keywords?", getJobs); //get all jobs

// app.get("/api/jobs/:jobid");  //get individual job with job id

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is running on port:${PORT}`));
