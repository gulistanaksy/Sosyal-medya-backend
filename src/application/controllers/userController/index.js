const userCreate = require("./userCreate");
const getUser = require("./getUser");
const login=require("./login");

class UserController {
  userCreate = userCreate;
  getUser = getUser;
  login = login;
}

module.exports = UserController;
