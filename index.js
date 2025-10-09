import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("✅ Backend работает внутри Docker!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на этом порту ${PORT}`);
});
