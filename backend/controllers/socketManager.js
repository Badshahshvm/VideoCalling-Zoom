const { Server } = require("socket.io");
const initializeSocket = (server) => {
  const io = new Server(server);
  return io;
};

module.exports = initializeSocket;
