const UserSignup = require("../../models/UserSchema/userSignup.js"); //users collection
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function verifyJwt(req, res, next) {
  const body = req.headers;
  const { authorization } = body;
  const jwt_token = authorization && authorization.split(" ")[1];

  console.log("The header is", body);
  console.log("The verify jwt token is", jwt_token);

  if (!jwt_token) {
    return res
      .status(401)
      .json({ message: "Token Not Valid,Please Login again" });
  }

  const isUserValid = jwt.verify(
    jwt_token,
    process.env.JWT_Access_TOKEN,
    (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      console.log("JWT verifyied user", user);

      req.user = user;
    }
  );
  next();
}

module.exports = verifyJwt;
