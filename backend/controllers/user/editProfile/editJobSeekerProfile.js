const Users = require("../../../models/UserSchema/userSignup");

async function editJobSeekerProfile(req, res) {
  const { userId } = req.params;
  const body = req.body;

  //prettier-ignore
  const {name,email,phone,location,skills,linkedin,company,experince,institute,degree,} = body;

  console.log("Edit profile route for job seeker", userId, body);

  if (!body) {
    return res.status(400).json({
      message: "Error occured due to missing form body",
      status: "Error",
      body: body,
    });
  }

  const filter = { _id: userId };
  const updateData = {
    userName: name,
    userEmail: email,
    userPhoneNumber: phone,

    userCity: location,

    userSkills: skills,

    userSocial: linkedin,
    userExperience: {
      companyName: company,
      yoe: experince,
    },

    userEducation: {
      instituteName: institute,
      degree: degree,
    },
  };
  try {
    const updatedUser = await Users.findByIdAndUpdate(filter, updateData, {
      new: true,
    });

    console.log("Updated user profile:", updatedUser);

    if (!updatedUser) {
      return res.status(400).json({
        message: "Failed to update the user Profile",
        status: "Failure",
      });
    }

    return res.status(200).json({
      message: "Updated the user Profile successfully",
      status: "Success",
      updatedUser: updatedUser,
    });
  } catch (err) {
    console.error("Error:", err);

    return res.status(400).json({
      message: "Error while updating the user Profile",
      status: "Error",
    });
  }
}

module.exports = editJobSeekerProfile;

//tomorrow task-> data is updating correctly, render data in frotend
