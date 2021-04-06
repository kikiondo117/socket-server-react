const express = require("express");
const http = require("http");
const socketio = require("socket.io");
// Cuando te mueves entre directorios, es mejor utilizar el path
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Http server
    this.server = http.createServer(this.app);
    // Configuraciones de sockets
    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  socketConfiguration() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar middlewares
    this.middlewares();
    // Inicializar sockets
    this.socketConfiguration();
    // Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server listening", this.port);
    });
  }
}

module.exports = Server;
