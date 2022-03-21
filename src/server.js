import express from "express";
import WebSocket from "ws";
import http from "http";

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

const server = http.createServer(app); //http 서버
const wss = new WebSocket.Server({ server }); // http 서버에 WebSocket으로 랜더링 하기 위해서
server.listen(PORT, () => {
  console.log(`Server Start http://localhost:${PORT}`);
});
