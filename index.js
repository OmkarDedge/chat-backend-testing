const express = require("express");
const chats = require("./data/data.js");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRouter = require("./routes/userRoutes.js");
const chatRouter = require("./routes/chatRoutes.js");
const { notFound, errorHandler } = require("./middleware/errormiddleware.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use(express.json());
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies) to be included
  })
);

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server Started on PORT : 5000");
});
