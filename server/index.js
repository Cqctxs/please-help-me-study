require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));
app.enable("trust proxy");
app.disable("x-powered-by");

app.use("/test", require("./routes/test"));
app.use("/api/grade", require("./routes/api/grade"));
app.use("/api/problem", require("./routes/api/problem"));

app.use("/", function (req, res) {
  res.json({ error: "endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
