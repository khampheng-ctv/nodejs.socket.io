const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const RoutesApi = require("./src/routes");
const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

//REST API
RoutesApi(app, io);

server.listen(port, () =>
  console.log(`Server ready at http://localhost:${port}`)
);
