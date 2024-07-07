const express = require("express");
const mongoose = require("mongoose");
const http = require("http"); // Correct the import
const router = require("./routes/userRoutes");

// Correct the import
const cors = require("cors");
const initializeSocket = require("./controllers/socketManager");
require("dotenv").config();

const dbUrl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

connectDB();

const app = express();
app.use(cors()); // Adding CORS middleware
app.use(express.json());
const server = http.createServer(app); // Correct the server creation

const io = initializeSocket(server); // Initialize Socket.IO with the server

app.get("/", (req, res) => {
  return res.json({
    hello: "world",
  });
});

app.use("/api/v1/users", router);
server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is live on port ${process.env.PORT}`);
});
