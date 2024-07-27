const getProfile = require("./getProfile");
const createProfile = require("./createProfile");

class ProfileController {
  getProfile = getProfile;
  createProfile = createProfile;
}

module.exports = ProfileController;
