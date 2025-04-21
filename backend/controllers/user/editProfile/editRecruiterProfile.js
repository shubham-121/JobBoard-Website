const Users = require("../../../models/UserSchema/userSignup");

async function editRecruiterProfile(req, res) {
  const body = req.body;
  const { userId } = req.params;

  console.log("edit recruite profile:", body);
  const {
    name,
    email,
    phone,
    location,
    skills,
    company,
    experince,
    companyWebsite,
    aboutCompany,
    designation,
    resume,

    companyLogo,
    linkedin,
    headline,
  } = req.body;

  console.log("Job recruiter resume", resume);

  const filter = {
    _id: userId,
    userRole: "Recruiter",
  };

  const update = {
    userName: name,
    userEmail: email,
    userPhoneNumber: phone,
    userCity: location,
    userHeadline: headline,
    userSocial: linkedin,
    userResume: resume,
    userSkills: skills,

    userYoe: experince,

    recruiterProfile: {
      companyName: company,
      companyWebsite: companyWebsite,
      aboutCompany: aboutCompany,
      designation: designation,
      linkedInProfile: linkedin,
      companyLogo: companyLogo,
    },
  };
  try {
    const updatedUser = await Users.findByIdAndUpdate({ _id: userId }, update, {
      new: true,
    });

    console.log("updated recuirter info;", updatedUser);

    if (!updatedUser) {
      return res.status(400).json({
        message: "Failed to update the recruiter info",
        status: "Failure",
      });
    }

    return res.status(200).json({
      message: "Successfully updated the user info",
      status: "Success",
      updatedUser,
    });
  } catch (error) {
    console.error("Error in updating the user info:", error.message);
    return res.status(500).json({
      message: "Internal Server Error while updating recruiter info",
      status: "Error",
    });
  }
}

module.exports = editRecruiterProfile;
