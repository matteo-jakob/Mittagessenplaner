const loginController = require("./controller/00_LoginController.js");
const menuController = require("./controller/01_MenuController.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("../client/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// ========================================= API ===================================================

app.get("/menu/getAll", menuController.getAll);

// == LOGIN/REGISTER ==

app.post("/login", loginController.login);
app.post("/auth", loginController.auth);
app.post("/changepassword", loginController.changepassword);
app.post("/register", loginController.register);
app.get("/getuserlist", loginController.getuserlist);
