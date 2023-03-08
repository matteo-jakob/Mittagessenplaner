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

  async auth(req, res) {
    try {
      const token = req.body.token;
      console.log("Server token: " + token);
      var jwtData = jwt.verify(token, "mySuperSecretKey");
      if (jwtData) {
        return res.json({
          err: false,
          msg: "authorization complete",
        });
      }
    } catch (error) {
      console.log("Server got error: " + error);
      return res.json({
        err: true,
        msg: "authorization error",
      });
    }
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
