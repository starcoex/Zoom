// Socket.io Client Start

const socketio = io();

const welcome = document.querySelector("#welcome");
const room = document.querySelector("#room");
const form = welcome.querySelector("form");

let roomName;
room.hidden = true;
function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  console.log(li.value);
  li.innerHTML = message;
  ul.append(li);
}
function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#message input");
  const value = input.value;
  socketio.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
    // event.preventDefault();
    // const input = room.querySelector("input");
    // socketio.on("new_messaga", input.value, roomName, () => {
    //   addMessage(`당신은: ${input.value}`);
  });
  input.value = "";
}
function handleNickNameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socketio.emit("nickname", value);
  // value = "";
}
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerHTML = `Room : ${roomName} `;
  const messageForm = room.querySelector("#message");
  const nickNameForm = room.querySelector("#name");
  messageForm.addEventListener("submit", handleMessageSubmit);
  nickNameForm.addEventListener("submit", handleNickNameSubmit);
  // const roomForm = room.querySelector("form");
  // console.log(roomForm);
  // roomForm.addEventListener("submit", handleMessageSubmit);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socketio.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
socketio.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerHTML = `Room : ${roomName} (${newCount})`;
  addMessage(`${user} 방에 들어왔습니다`);
});
socketio.on("bye", (bye, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerHTML = `Room : ${roomName} (${newCount})`;
  addMessage(`${bye} 방을 나갔습니다`);
});
socketio.on("new_message", (message) => {
  addMessage(message);
});

socketio.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerHTML = room;
    roomList.appendChild(li);
  });
});
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickForm = document.querySelector("#nick");
// const socket = new WebSocket(`ws://${window.location.host}`); //Server에서 가져온 정보를 socket 변수에 저장

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

// // Server에서 보내는 메세지 받기
// socket.addEventListener("open", () => {
//   console.log("Server Connected");
// });
// socket.addEventListener("message", (servermessage) => {
//   console.log(servermessage.data);
//   const li = document.createElement("li");
//   li.innerText = servermessage.data;
//   messageList.appendChild(li);
// });
// socket.addEventListener("close", () => {
//   console.log("Server Die");
// });
// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   // socket.send(input.value);
//   socket.send(makeMessage("new_message", input.value));
//   input.value = "";
//   // messageList.setAttribute = "li";
//   // messageList.appendChild = input.value;
//   // console.log(messageList);
// }
// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector("input");
//   // socket.send({
//   //   type: "nickname",
//   //   payload: input.value,
//   // }); //nick, message 구분하기 위해 JSON 형식으로 보냄
//   socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// }
// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);
