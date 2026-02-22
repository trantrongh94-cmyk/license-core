const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n");
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, "\n");

function signLicense(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "30d"
  });
}
function verifyLicense(token) {
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ["RS256"]
  });
}
module.exports = {
  signLicense,
  verifyLicense
};