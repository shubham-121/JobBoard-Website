//get user profile details like name,email etc using jwt token
const Users = require("../../models/UserSchema/userSignup");

async function profile(req, res) {
  const user = req.user;
  const { email, _id } = user;

  if (!email || !_id) {
    return res.status(400).json({
      message: "Error occured due to missing data",
      status: "Error",
      userDetails: { userEmail: email, userID: _id },
    });
  }

  //1- searc user db, get details of user
  const userDetails = await Users.findOne({ userEmail: email });

  if (!userDetails) {
    return res.status(400).json({
      message: "Failed to get the user details",
      status: "Failure",
      userDetails: { userEmail: email, userID: _id },
    });
  }

  console.log("User details for profile route", userDetails);

  return res.status(200).json({
    message: "User profile details found",
    status: "Success",
    userDetails: userDetails,

    // userDetails: { userEmail: email, userID: _id },
  });
}

module.exports = profile;
