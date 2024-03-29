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
var shoppingItems = [];
const items = [
  {
    id: 0,
    item: "Potatoes",
    price: 10,
    image_url:
      "https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_1280.jpg",
  },
  {
    id: 1,
    item: "Rice",
    price: 8,
    image_url:
      "https://cdn.pixabay.com/photo/2019/02/15/03/28/rice-3997767_1280.jpg",
  },
  {
    id: 2,
    item: "Flour",
    price: 10,
    image_url:
      "https://cdn.pixabay.com/photo/2020/05/12/17/54/rolling-pin-5164240_960_720.jpg",
  },
  {
    id: 3,
    item: "Water",
    price: 3,
    image_url:
      "https://cdn.pixabay.com/photo/2018/07/09/15/20/desire-3526366_960_720.jpg",
  },
  {
    id: 4,
    item: "Cola",
    price: 4.5,
    image_url:
      "https://cdn.pixabay.com/photo/2016/11/29/13/49/bottle-1869990_960_720.jpg",
  },
];

app.post("/add-to-cart", (req, res) => {
  try {
    var item = req.body;
    shoppingItems.push(item);
    console.log(shoppingItems);
    res.sendStatus(200);
  } catch (err) {
    console.error("Failed to add item to cart:", err);
    res.status(500).send({ error: "Failed to add item to cart" });
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/loginEJS", (req, res) => {
  res.render("login.ejs");
});
app.get("/menuEJS", (req, res) => {
  res.render("menu.ejs", { items: items });
});

app.get("/shopping-cartEJS", (req, res) => {
  let updatedShoppingItems = [];
  if (shoppingItems) {
    for (let i = 0; i < shoppingItems.length; i++) {
      let itemId = parseInt(shoppingItems[i].id);
      //chatGPT for the find function
      let item = items.find((item) => item.id === itemId);

      if (item) {
        updatedShoppingItems.push(item);
      }
    }
  }
  console.log(
    "Updated Shopping items: " + JSON.stringify(updatedShoppingItems)
  );
  res.render("shopping-cart.ejs", { cartItems: updatedShoppingItems });
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
      res.render("index", {
        title: "Login",
        loginMessage: `${name}`,
      });
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
