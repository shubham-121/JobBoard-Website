const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDB = require("./connection.js");

//controllers files
const userSignup = require("./controllers/auth/signup.js");
const loginUser = require("./controllers/auth/login.js");

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "This is the index route" });
});

//1- user login route
app.post("/api/auth/signup", userSignup);
app.post("/api/auth/login", loginUser);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend is running on port:${PORT}`));
