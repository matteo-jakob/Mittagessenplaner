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
let userMatch = false;
app.post("/login", async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  const client = await MongoClient.connect(url, {
    serverSelectionTimeoutMS: 10000,
  });
  const db = client.db(dbName);
  const collection = db.collection("Logindatens");

  collection.find().toArray(function (err, users) {
    if (err) {
      console.log("Error finding users in DB: ", err);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
      return;
    }
    users.forEach(function (user) {
      if (name == user.name && bcrypt.compare(password, user.passwordR)) {
        userMatch = true;
      }
    });
    if (userMatch) {
      const messageContent = `Hello ${name}`;
      res.json({ status: "success", message: messageContent });
    } else {
      res.json({ status: "error", message: "Incorrect username or password" });
    }

    client.close();
  });
});
<<<<<<< HEAD
=======
app.get("/login", loginController.login);
>>>>>>> 5c1376231bc686ab8386e789ee8847a48b8cf722

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

<<<<<<< HEAD
=======
app.get("/register", loginController.register);
app.get("/getuserlist", loginController.getuserlist);
app.get("/getall", menuController.getAll);

>>>>>>> 5c1376231bc686ab8386e789ee8847a48b8cf722
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
