import express from "express";

const app = express();

const PORT = 4000;

app.listen(PORT, function () {
  console.log(`Server Start http://localhost:${PORT}`);
});
