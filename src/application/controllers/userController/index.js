const userCreate = require("./userCreate");
const listAllUsers = require("./listAllUsers");
const login=require("./login");

class UserController {
  userCreate = userCreate;
  listAllUsers = listAllUsers;
  login = login;
}

module.exports = UserController;
