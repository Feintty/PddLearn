const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const questionsRoutes = require("./routes/questionsRoutes");
const config = require("./config");

const PORT = config.port;
const app = express();

app.use(express.json());
app.use("/auth", cors(), authRoutes);
app.use("/data", cors(), dataRoutes);
app.use("/questions", cors(), questionsRoutes);
app.use("/images", cors(), express.static("./data/images"));
app.use("/theorydata", cors(), express.static("./data/theory"));

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://feintty:qwerty123@cluster0.tkh3t.mongodb.net/PDDLearn?retryWrites=true&w=majority",
      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    );
    app.listen(PORT, () => console.log(`Сервер запущен! Порт: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();



