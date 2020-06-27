require("dotenv").config();
require("./server/config/database");
const express = require("express");

const app = express();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./server/routes/api/users"));
app.use("/api/presentations", require("./server/routes/api/presentations"));
app.use("/api/notes", require("./server/routes/api/notes"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
