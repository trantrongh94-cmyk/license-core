process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

const app = require("./src/app");

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined");
}

app.listen(PORT, () => {
  console.log(`🚀 Running on port ${PORT}`);
});