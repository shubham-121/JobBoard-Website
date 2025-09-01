const Users = require("../../../models/UserSchema/userSignup");

async function editJobSeekerProfile(req, res) {
  const { userId } = req.params;
  const body = req.body;

  console.log("Edit profile form:", body);

  if (!userId) {
    return res.status(400).json({
      message: "User ID is missing from request parameters",
      status: "Error",
    });
  }

  //prettier-ignore
  const {
    name,
    email,
    phone,
    location,
    skills,
    linkedin,
    company,
    experince,
    institute,
    degree,
    headline,
    resume,
    professionalData,
  } = body;

  //extract user previous professional data like experince,projects,education
  const { experince: prevExperince, projects, education } = professionalData;

  console.log("Experince:", prevExperince);

  console.log("projects:", projects);

  console.log("education:", education);
  // console.log("Edit profile route for job seeker", userId, body);

  // if (!body) {
  //   return res.status(400).json({
  //     message: "Error occured due to missing form body",
  //     status: "Error",
  //     body: body,
  //   });
  // }

  const filter = { _id: userId };
  const updateData = {
    userName: name,
    userEmail: email,
    userPhoneNumber: phone,
    userCity: location,

    userSkills: skills,
    userSocial: linkedin,

    userHeadline: headline,
    userResume: resume,

    userExperience: Array.isArray(prevExperince)
      ? prevExperince.map((exp, i) => ({
          companyName: exp.organisation,
          jobTitle: exp.position,
          yoe: exp.duration,
        }))
      : [],

    userEducation: Array.isArray(education)
      ? education.map((edu, i) => ({
          instituteName: edu.instituteName,
          degree: edu.degreeName,
          duration: edu.educationDuration,
        }))
      : [],

    userProjects: Array.isArray(projects)
      ? projects.map((proj, i) => ({
          projectName: proj.projectName,
          description: proj.projectInfo,
          duration: proj.projectDuration,
        }))
      : [],
  };

  try {
    const updatedUser = await Users.findByIdAndUpdate(filter, updateData, {
      new: true,
    });

    // console.log("Updated user profile:", updatedUser);

    if (!updatedUser) {
      return res.status(400).json({
        message: "Failed to update the user Profile",
        status: "Failure",
        updatedUser: updatedUser,
      });
    }

    return res.status(200).json({
      message: "Updated the user Profile successfully",
      status: "Success",
      updatedUser: updatedUser,
    });
  } catch (err) {
    console.error("Error:", err);

    return res.status(500).json({
      message: "Error while updating the user Profile",
      status: "Error",
    });
  }
}

module.exports = editJobSeekerProfile;
