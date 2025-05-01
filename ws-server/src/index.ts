import WebSocket, { WebSocketServer } from "ws";

import express from "express";
import { SocketProvider } from "ethers";

var port = 8082;

const app = express();

const httpServer = app.listen(port, function () {
  console.log(new Date() + " Server is listening on port " + port);
});

const wss = new WebSocketServer({ server: httpServer });

var users = 0;
wss.on("connection", function connection(socket) {
  socket.on("error", (err) => console.error(err));
  ++users;
  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("data : %s", data);
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log(users + " connected !");

  socket.send(`Welcome to Ws Server !. ${users}`, { binary: false });
});
