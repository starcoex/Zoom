const socket = new WebSocket(`ws://${window.location.host}`); //Server에서 가져온 정보를 socket 변수에 저장
console.log(socket);

// Server에서 보내는 메세지 받기
socket.addEventListener("open", () => {
  console.log("Server Connected");
});
socket.addEventListener("message", (servermessage) => {
  console.log(`Server Message: ${servermessage.data}`);
});
socket.addEventListener("close", () => {
  console.log("Server Die");
});
setTimeout(() => {
  socket.send("Client Send");
}, 5000);
