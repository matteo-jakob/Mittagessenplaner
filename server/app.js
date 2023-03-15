const loginController = require("./controller/00_LoginController.js");
const menuController = require("./controller/01_MenuController.js");

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

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
app.post("/login", async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("Logindatens");

  collection.findOne({ username: name }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!user) {
      return res.status(401).send("Username or password is incorrect");
    }
    bcrypt.compare(password, user.passwordR, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      if (!result) {
        return res.status(401).send("Username  password is incorrect");
      }

      return res.status(200).send("Login Successful");
    });
  });
});
app.get("/login", loginController.login);

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

app.get("/register", loginController.register);
app.get("/getuserlist", loginController.getuserlist);
app.get("/getall", menuController.getAll);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
