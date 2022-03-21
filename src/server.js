import express from "express";
import res from "express/lib/response";

const app = express();

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

const home = (req, res) => {
  res.render("home");
};
app.get("/", home);

app.listen(PORT, function () {
  console.log(`Server Start http://localhost:${PORT}`);
});
