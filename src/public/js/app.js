const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`); //Server에서 가져온 정보를 socket 변수에 저장

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// Server에서 보내는 메세지 받기
socket.addEventListener("open", () => {
  console.log("Server Connected");
});
socket.addEventListener("message", (servermessage) => {
  console.log(servermessage.data);
  const li = document.createElement("li");
  li.innerText = servermessage.data;
  messageList.appendChild(li);
});
socket.addEventListener("close", () => {
  console.log("Server Die");
});
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // socket.send(input.value);
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
  // messageList.setAttribute = "li";
  // messageList.appendChild = input.value;
  // console.log(messageList);
}
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  // socket.send({
  //   type: "nickname",
  //   payload: input.value,
  // }); //nick, message 구분하기 위해 JSON 형식으로 보냄
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
