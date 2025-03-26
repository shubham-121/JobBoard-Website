async function profile(req, res) {
  const user = req.user;
  const { email, _id } = user;

  return res.status(200).json({
    message: "User profile route verified",
    userDetails: { userEmail: email, userID: _id },
  });
}

module.exports = profile;
