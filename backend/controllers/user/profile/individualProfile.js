//get user profile details  with the userId
const Users = require("../../../models/UserSchema/userSignup");

async function individualProfile(req, res) {
  const { userId } = req.params;
  console.log("individual User details for profile route, userId", userId);

  if (!userId) {
    return res.status(400).json({
      message: "Error occured due to missing userId",
      status: "Error",
      userId: userId,
    });
  }

  //1- searc user db, get details of user
  const individualUserDetails = await Users.findOne(
    { _id: userId },
    { userPassword: 0 }
  );

  console.log(
    "individual User details for profile route",
    individualUserDetails
  );

  if (!individualUserDetails) {
    return res.status(400).json({
      message: "Failed to get the user details with the userId",
      status: "Failure",
    });
  }

  return res.status(200).json({
    message: "User profile details found",
    status: "Success",
    individualUserDetails: individualUserDetails,

    // individualUserDetails: { userEmail: userId, userID: _id },
  });
}

module.exports = individualProfile;
