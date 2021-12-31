const socket = io();
let username;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");
do {
  username = prompt("Enter your name.");
} while (!username);

textarea.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    sendMessage(e.target.value);
    textarea.value = "";
  }
});

const sendMessage = (message) => {
  const msg = {
    username,
    message: message.trim(),
  };
  appendMessage(msg, "outgoing");
  scollToBottom();
  socket.emit("message", msg);
};
const appendMessage = (mes, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
    <h4>${mes.username}</h4>
    <p>${mes.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
};

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scollToBottom();
});

const scollToBottom = () => {
  messageArea.scrollTo = messageArea.scrollHeight;
};
