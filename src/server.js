import express from "express";
// import WebSocket from "ws";
import http from "http";
import SocketIO from "socket.io";
const app = express();

const PORT = 4000;
// const ws = new WebSocket();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

const home = (req, res) => {
  res.render("home");
};
const handleRedirect = (req, res) => {
  res.redirect("/");
};
app.get("/", home);
app.get("*", handleRedirect);

const httpServer = http.createServer(app); //http 서버
const socketIoServer = SocketIO(httpServer);

socketIoServer.on("connection", (socketio) => {
  // console.log(socketio);
  socketio.onAny((event) => {
    console.log(event);
  });
  socketio.on("enter_room", (roomName, done) => {
    console.log(socketio.rooms);
    socketio.join(roomName);
    console.log(socketio.rooms);
    done();
    socketio.to(roomName).emit("welcome");
  });
});

// socket.io start

// const wss = new WebSocket.Server({ server }); // http 서버에 WebSocket으로 랜더링 하기 위해서
// const socketsDb = [];
// wss.on("connection", (socket) => {
//   socketsDb.push(socket);
//   socket["nickname"] = "Anon";
//   // FronEnd에서 정보가 socket이라는 변수로 전달됨, 서버에 socket은 연결된 브라우저 즉 frontend
//   socket.on("close", () => {
//     console.log("Client Die");
//   });
//   socket.on("message", (clientMessage) => {
//     const parsed = JSON.parse(clientMessage);
//     // console.log(parsed, clientMessage.toString());
//     if (parsed.type === "new_message") {
//       socketsDb.forEach((socketdb) =>
//         socketdb.send(`${socket.nickname}: ${parsed.payload}`)
//       );
//     } else if (parsed.type === "nickname") {
//       // socketsDb.forEach((socketdb) => socketdb.send(parsed.payload));
//       socket["nickname"] = parsed.payload;
//       // console.log(socket);
//     }
//   });
//   // socket.send("Server Send"); //Server에서 메세지 보내기
// });

httpServer.listen(PORT, () => {
  console.log(`Server Start http://localhost:${PORT}`);
});
