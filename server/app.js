const menuController = require("./controller/01_MenuController.js");

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();

app.use(express.static("../client/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
const { loadavg } = require("os");
const { $ } = require("static");
const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://admin-elvis:kali@cluster0.sbjotar.mongodb.net/Mittagessenplaner";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const RegisterSchema = new mongoose.Schema({
  Name: String,
  Surname: String,
  Email: String,
  password: String,
});
const Register = mongoose.model("Logindaten", RegisterSchema);
const dbName = "Mittagessenplaner";

// ========================================= API ===================================================

app.get("/menu/getAll", menuController.getAll);

// == LOGIN/REGISTER ==

app.post("/login", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/index.html");
  const name = req.body.username;
  const password = req.body.password;

  const client = await MongoClient.connect(url, {
    serverSelectionTimeoutMS: 10000,
  });
  const db = client.db(dbName);
  const collection = db.collection("Logindatens");

  try {
    const user = await collection.findOne({ name: name });

    if (password == user.passwordR) {
      const messageContent = `Hello ${name}`;
      res.json({ status: "success", message: messageContent });
    } else {
      res
        .status(401)
        .json({ status: "error", message: "Incorrect username or password" });
    }
  } catch (err) {
    console.log("Error finding user in DB: ", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.close();
  }
});

app.post("/register", async (req, res) => {
  const { name, surname, email, passwordR } = req.body;

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("Logindatens");

  collection.insertOne(
    { name, surname, email, passwordR },
    function (err, result) {
      if (err) {
        console.log("Error Registering: ", err);
        console.log(err);
      } else {
        console.log(result);
      }
      res.send("You are sucessfully registered");
    }
  );
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
