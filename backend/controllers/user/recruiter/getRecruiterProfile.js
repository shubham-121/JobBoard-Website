// /api/user/recruiterProfile/${userId}
//get user profile details  with the userId
const Users = require("../../../models/UserSchema/userSignup");
const mongoose = require("mongoose");

async function getRecruiterProfile(req, res) {
  const { userId } = req.params;
  // console.log("get recruite profile", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      message: "Error occured due to missing/invalid userId",
      status: "Error",
      userId: userId,
    });
  }

  //1- searc user db, get details of user
  const recruiterProfile = await Users.findOne(
    { _id: userId, userRole: "Recruiter" },
    { userPassword: 0 }
  );

  // console.log("recruiter profile is: ", recruiterProfile);

  if (!recruiterProfile) {
    return res.status(400).json({
      message: "Failed to get the user details with the userId",
      status: "Failure",
    });
  }

  return res.status(200).json({
    message: "User profile details found",
    status: "Success",
    recruiterProfile: recruiterProfile,

    // recruiterProfile: { userEmail: userId, userID: _id },
  });
}

module.exports = getRecruiterProfile;
