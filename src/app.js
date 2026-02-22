const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "License Core OK" });
});

module.exports = app;