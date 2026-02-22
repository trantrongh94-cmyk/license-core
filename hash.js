const bcrypt = require("bcryptjs");

(async () => {
  const hash = await bcrypt.hash("ABC-123-XYZ", 10);
  console.log("HASH:", hash);
})();