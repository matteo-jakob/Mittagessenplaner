const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("../client/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
