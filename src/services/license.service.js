const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function activateLicense({ license_key, device_id, product_id }) {
  if (!license_key || !device_id || !product_id) {
    throw new Error("Missing required fields");
  }

  const result = await pool.query(
    "SELECT * FROM licenses WHERE product_id = $1",
    [product_id]
  );

  const licenses = result.rows;

  let matchedLicense = null;

  for (const license of licenses) {
    const isMatch = await bcrypt.compare(
      license_key,
      license.license_key_hash
    );

    if (isMatch) {
      matchedLicense = license;
      break;
    }
  }

  if (!matchedLicense) {
    throw new Error("Invalid license key");
  }

  if (matchedLicense.status !== "active") {
    throw new Error("License is not active");
  }

  if (
    matchedLicense.device_id &&
    matchedLicense.device_id !== device_id
  ) {
    throw new Error("License already activated on another device");
  }

  if (!matchedLicense.device_id) {
    await pool.query(
      "UPDATE licenses SET device_id = $1 WHERE id = $2",
      [device_id, matchedLicense.id]
    );
  }

  const token = jwt.sign(
    {
      license_id: matchedLicense.id,
      device_id,
      product_id
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    success: true,
    token
  };
}
async function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const result = await pool.query(
    "SELECT * FROM licenses WHERE id = $1",
    [decoded.license_id]
  );

  if (result.rows.length === 0) {
    throw new Error("License not found");
  }

  const license = result.rows[0];

  if (license.status !== "active") {
    throw new Error("License inactive");
  }

  return {
    success: true,
    license_id: license.id,
    product_id: license.product_id
  };
}module.exports = {
  activateLicense,
  verifyToken
};