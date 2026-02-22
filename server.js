const app = require("./src/app");

console.log("ENV PORT =", process.env.PORT);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Running on port ${PORT}`);
});