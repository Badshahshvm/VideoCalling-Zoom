const express = require("express");
const mongoose = require("mongoose");
const createServer = require("node:http");
const Server = require("socket.io");
const cors = require("cors");
const dbUrl =
  "mongodb+srv://shivamraj7479:jUeHi5bUwrBGqPkp@cluster0.mfzxy1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const app = express();
app.get("/", (req, res) => {
  return res.json({
    hello: "world",
  });
});

app.listen(4000, () => {
  console.log("server si live");
});
