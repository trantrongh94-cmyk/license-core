const express = require("express");
const router = express.Router();
const licenseService = require("../services/license.service");

// Activate license
router.post("/activate", async (req, res) => {
  try {
    const { license_key, device_id, product_id } = req.body;

    const result = await licenseService.activateLicense({
      license_key,
      device_id,
      product_id
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Verify token
router.post("/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const result = await licenseService.verifyToken(token);

    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;