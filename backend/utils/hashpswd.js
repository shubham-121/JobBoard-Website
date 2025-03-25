const bcrypt = require("bcrypt");

async function hashPassword(plain_password) {
  const saltRounds = 10;

  const hash = await bcrypt.hash(plain_password, saltRounds);
  console.log("Hashed function pswd:", hash);

  return hash;
}

module.exports = hashPassword;
