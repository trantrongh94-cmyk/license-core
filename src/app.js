const express = require("express");
const app = express();

app.use(express.json());

// ✅ CHỈ require 1 LẦN DUY NHẤT
const { signLicense, verifyLicense } = require("./utils/jwt");


// ================= ACTIVATE =================
app.post("/api/license/activate", (req, res) => {
  const { license_key, device_id } = req.body || {};

  if (!license_key || !device_id) {
    return res.status(400).json({
      error: "Missing license_key or device_id"
    });
  }

  const token = signLicense({
    license_key,
    device_id
  });

  res.json({
    success: true,
    token
  });
});


// ================= VERIFY =================
app.post("/api/license/verify", (req, res) => {
  const { token } = req.body || {};   // ✅ FIX CRASH

  if (!token) {
    return res.status(400).json({ error: "Missing token" });
  }

  try {
    const decoded = verifyLicense(token);

    res.json({
      valid: true,
      decoded
    });
  } catch (err) {
    res.status(401).json({
      valid: false,
      error: "Invalid token"
    });
  }
});


// ================= HEALTHCHECK =================
app.get("/", (req, res) => {
  res.json({ status: "License Core OK" });
});

app.get("/version", (req, res) => {
  res.json({
    name: "license-core",
    version: "1.0.0",
    env: process.env.NODE_ENV || "production"
  });
});

module.exports = app;