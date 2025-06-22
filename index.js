const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static('public'));

// Импорт моковых данных
const news = require("./data/news");
const analytics = require("./data/analytics");

app.get("/api/news", (req, res) => {
  res.json(news);
});

app.get("/api/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = news.find(n => n.id === id);
  if (item) res.json(item);
  else res.status(404).send("Not found");
});

app.get("/api/analytics", (req, res) => {
  res.json(analytics);
});

// Рендерим UI
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/news/:id", (req, res) => {
  res.sendFile(__dirname + "/views/news.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("GoGoAI Server running on port " + PORT));
