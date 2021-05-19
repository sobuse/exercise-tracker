const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require("body-parser");
require("dotenv").config();

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());
app.use(cors());

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(buildPath);
});

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
