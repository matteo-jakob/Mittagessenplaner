const menuData = require("../menuData.js");

module.exports = {
  async getAll(req, res) {
    try {
      res.json(menuData.getMenu());
    } catch (error) {
      console.error(error);
      res.json({
        err: true,
        msg: "server error",
      });
    }
  },
};
