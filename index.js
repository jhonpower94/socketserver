const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const socketUtils = require("./utils/socketUtils");

const server = http.createServer(app);

const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIoMiddleware = (req, res, next) => {
  req.io = io;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
};

// cors
app.use(cors());

//routes
app.use("/convert", socketIoMiddleware, (req, res) => {
  req.io.emit("message", `Hello, ${req.originalUrl}`);

  res.sendStatus(200);
});

//listen
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
