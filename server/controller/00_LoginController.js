const jwt = require("jsonwebtoken");
const loginDB = {
  admin: "Lernatelier1304",
};

module.exports = {
  async login(req, res) {
    setTimeout(() => {
      try {
        console.log(
          "\nname: " + req.body.username + "\npw: " + req.body.password
        );

        if (loginDB[req.body.username] == req.body.password) {
          res.json({
            err: false,
            login: true,
          });
        } else {
          res.json({
            err: true,
            login: false,
            msg: "wrong user credentials",
          });
        }
      } catch (error) {
        console.error(error);
        res.json({
          err: true,
          msg: "server error",
        });
      }
    }, 1453);
  },

  async register(req, res) {
    setTimeout(() => {
      try {
        if (!loginDB[req.body.username]) {
          loginDB[req.body.username] = req.body.password;
          res.json({
            err: false,
            register: true,
            [req.body.username]: loginDB[req.body.username],
          });
        } else {
          res.json({
            err: true,
            register: false,
            msg: "try other username",
          });
        }
      } catch (error) {
        console.error(error);
        res.json({
          err: true,
          msg: "server error",
        });
      }
    }, 1453);
  },

  async getuserlist(req, res) {
    res.json(loginDB);
  },
};
