const menuController = require("./controller/01_MenuController.js");

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("../public")); // set the public directory

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
const { loadavg } = require("os");
const { $ } = require("static");
const { dirname } = require("path");
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

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/loginEJS", (req, res) => {
  res.render("login.ejs");
});
app.get("/menuEJS", (req, res) => {
  res.render("menu.ejs");
});

app.get("/shopping-cartEJS", (req, res) => {
  res.render("shopping-cart.ejs");
});

app.get("/registerEJS", (req, res) => {
  res.render("login.ejs");
});
// == LOGIN/REGISTER ==

app.post("/login", async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  const client = await MongoClient.connect(url, {
    serverSelectionTimeoutMS: 10000,
  });
  const db = client.db(dbName);
  const collection = db.collection("Logindatens");

  try {
    const user = await collection.findOne({ name: name });

    if (!user) {
      // user not found
      const Nuser = "User not Found in my Database";
      res.render("login", {
        title: "Login",
        loginMessage: Nuser,
      });
    }

    if (password == user.passwordR) {
      // send a response with a success message
      const messageContent = `Hello ${name}`;
      console.log(messageContent);

      res.redirect("/");
    } else {
      const loginMessage = "Incorrect username or password";
      res.render("login", {
        title: "Login",
        loginMessage: loginMessage,
      });
    }
  } catch (err) {
    const ServerError = "Server Error! Try Again";
    res.render("login", {
      title: "Login",
      loginMessage: ServerError,
    });
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
      const success = "You are sucessfully registered";
      res.render("login", {
        title: "register",
        registerMessage: success,
      });
    }
  );
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
