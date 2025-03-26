const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDB = require("./connection.js");

//controllers files
const userSignup = require("./controllers/auth/signup.js");
const loginUser = require("./controllers/auth/login.js");
const verifyJwt = require("./controllers/auth/verifyJwt.js");

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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is running on port:${PORT}`));
