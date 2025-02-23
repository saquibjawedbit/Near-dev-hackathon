import express from "express";
import axios from "axios";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";
import gameRouter from "./routes/gameRoutes.js";


const app = express();
const server = http.createServer(app);
const io =  new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/game", gameRouter);
app.use("/api/contract", contractRouter);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
