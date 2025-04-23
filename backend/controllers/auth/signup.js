const UserSignup = require("../../models/UserSchema/userSignup.js"); //users collection
const jwt = require("jsonwebtoken");
const hashPassword = require("../../utils/hashpswd.js");
const nodeMailerWelcome = require("../nodemailer/nodeMailerWelcome.js");

require("dotenv").config();

async function userSignup(req, res) {
  const body = req.body;

  const { userRole, name, email, phoneNumber, password, city } = body;

  //1- form data validation
  if (!userRole || !name || !email || !phoneNumber || !password || !city) {
    return res.status(400).json({
      message: "Complete Form Data Is Missing, Please Enter Full Form Data",
      userData: { userRole, name, email, phoneNumber, password, city },
    });
  }

  console.log("User sign up body", body);

  try {
    //2- look for exsisting user in DB with email, phoneNumber
    const exsistingUser = await UserSignup.findOne({
      userEmail: email,
    });
    const exsistingUser2 = await UserSignup.findOne({
      userPhoneNumber: phoneNumber,
    });

    console.log("exsisting user found with same email:", exsistingUser);
    console.log("exsisting user found with same phone:", exsistingUser2);

    if (exsistingUser || exsistingUser2) {
      return res.status(400).json({
        message: "User already exsists in the DB, login again",
        exsistingUser: exsistingUser || exsistingUser2,
      });
    }

    //3-create a new user if user doesnt exsist

    //hash the pswd first
    const hashpswd = await hashPassword(password);

    console.log("hash password in signup route:", hashpswd);

    const newUser = await UserSignup.create({
      userName: name,
      userEmail: email,
      userPhoneNumber: phoneNumber,
      userPassword: hashpswd,
      userCity: city,
      userRole: userRole,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Problem in creating the user in the DB",
        user: newUser,
      });
    }

    //4- generate a jwt token for the user
    const user = { _id: newUser._id, email: newUser.email };
    const jwt_token = jwt.sign(user, process.env.JWT_Access_TOKEN);

    console.log("jwt token for new created user", jwt_token);

    //send a welcome mail also to the user
    nodeMailerWelcome(email, (newuser = true));

    // 3-send response to frontend
    return res.status(200).json({
      message: "Successfully created the  user in the DB",
      userName: name,
      userEmail: email,
      userPhoneNumber: phoneNumber,
      userRole: userRole,
      token: jwt_token,
    });
  } catch (err) {
    console.error("Error in creating the user", err.message);
    throw new Error();
  }
}

module.exports = userSignup;
