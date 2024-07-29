const getProfile = require("./getProfile");
const createProfile = require("./createProfile");
const updateProfile = require("./updateProfile")

class ProfileController {
  getProfile = getProfile;
  createProfile = createProfile;
  updateProfile=updateProfile;
}

module.exports = ProfileController;
