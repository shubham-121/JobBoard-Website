const UserSignup = require("../../models/UserSchema/userSignup.js"); //users collection
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const hashPassword = require("../../utils/hashpswd.js");
const userSignup = require("./signup.js");

require("dotenv").config();

async function loginUser(req, res) {
  //validate user credentials , unhash the password,search in DB, assign jwt, return user

  const body = req.body;
  const { email, password } = body;

  //1-field validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Required Fields Are Missing, Please Enter All",
      status: "Failure",
    });
  }

  try {
    //2-unhash the password
    // find user using email, get the user data from db, unhash the pswd, if match assign jwt else return error

    const searchUser = await UserSignup.findOne({ userEmail: email });

    if (!searchUser) {
      return res.status(404).json({
        message: "Email not found. Please sign up first.",
        status: "Failure",
      });
    }

    console.log("Login -> searched user", searchUser);

    //get the user details from DB

    const searchUserPswd = searchUser.userPassword;

    //unhash the password
    const isPasswordMatch = await bcrypt.compare(password, searchUserPswd);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
        status: "Failure",
      });
    }

    console.log("User pswd matched with the hash password", isPasswordMatch);

    //generate and assign jwt
    const user = { email: searchUser.userEmail, _id: searchUser._id };
    const jwt_token = jwt.sign(user, process.env.JWT_Access_TOKEN, {
      expiresIn: "1h",
    });

    console.log("jwt token for logged in user", jwt_token);

    // 3-send response to frontend
    return res.status(200).json({
      message: "Successfully logged in.",
      status: "Success",
      userName: searchUser.userName,
      userEmail: searchUser.userEmail,
      userPhoneNumber: searchUser.userPhoneNumber,
      token: jwt_token,
    });
  } catch (err) {
    console.error("Error in logging the user in:", err.message);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      status: "Failure",
    });
  }
}

module.exports = loginUser;
