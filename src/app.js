const express = require("express");

const app = express();

app.use(express.json());

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