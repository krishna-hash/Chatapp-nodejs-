const io = require("socket.io")(3000);

const User = {};
io.on("connect", (socket) => {
  socket.on("new-person", (name) => {
    User[socket.id] = name;
    socket.broadcast.emit("user-name", name);
  });
  socket.on("chat-message", (message) => {
    socket.broadcast.emit("msg", { message: message, name: User[socket.id] });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnect", User[socket.id]);
    delete User[socket.id];
  });
});
