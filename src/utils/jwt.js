const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

if (!PRIVATE_KEY) {
  throw new Error("JWT_PRIVATE_KEY is missing in environment");
}

function signLicense(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: "30d"
  });
}

module.exports = {
  signLicense
};
const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

function verifyLicense(token) {
  return jwt.verify(token, PUBLIC_KEY, {
    algorithms: ["RS256"]
  });
}

module.exports = {
  signLicense,
  verifyLicense
};