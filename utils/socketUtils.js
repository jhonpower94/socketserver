const socketIo = require("socket.io");
const CC = require("crypto-converter-lt");
let cryptoConverter = new CC();

exports.sio = (server) => {
  return socketIo(server, {
    transport: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("a user is connected");

    socket.on("message", (message) => {
      console.log(`message from ${socket.id}: ${message}`);
    });

    socket.on("convert", (data) => {
      const { from, to, amount } = data;

      cryptoConverter
        .from(from)
        .to(to)
        .amount(amount)
        .convert()
        .then((response) => {
          console.log(response); //or do something else
          socket.emit("convert", response);
        });
    });

    socket.on("convertfrom", (data) => {
      const { from, to, amount } = data;
      console.log(to);
      cryptoConverter
        .from(from)
        .to(to)
        .amount(amount)
        .convert()
        .then((response) => {
          console.log(response); //or do something else
          socket.emit("convertfrom", response);
        });
    });

    socket.on("convertTo", (data) => {
      const { from, to, amount } = data;
      cryptoConverter
        .from(from)
        .to(to)
        .amount(amount)
        .convert()
        .then((response) => {
          console.log(response); //or do something else
          socket.emit("convertTo", response);
        });
    });

    socket.on("quoterate", (data) => {
      const { from, to, amount } = data;
      cryptoConverter
        .from(from)
        .to(to)
        .amount(amount)
        .convert()
        .then((response) => {
          console.log(response); //or do something else
          socket.emit("quoterate", response);
        });
    });

    socket.on("maxcoin", (data) => {
      const { from, to, amount } = data;

      cryptoConverter
        .from(from)
        .to(to)
        .amount(amount)
        .convert()
        .then((response) => {
          console.log(response); //or do something else
          socket.emit("maxcoin", response);
        });
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};
