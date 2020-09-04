const socket = io("http://localhost:3000");
const submit = document.querySelector("form");
const message = document.getElementById("text");
const messagecontent = document.querySelector(".message-contain");

const name = prompt("whats your name:");
socket.emit("new-person", name);

socket.on("msg", (data) => {
  appending(`${data.name}:${data.message}`);
});
socket.on("user-name", (name) => {
  appending(`${name}:joined`);
});
socket.on("user-disconnect", (name) => {
  appending(`${name} diconnected`);
});
submit.addEventListener("submit", (e) => {
  e.preventDefault();
  const formmessage = message.value;
  appending(`You:${formmessage}`);
  socket.emit("chat-message", formmessage);
  message.value = "";
});

const appending = (message) => {
  const element = document.createElement("div");
  element.innerText = message;
  messagecontent.append(element);
};
