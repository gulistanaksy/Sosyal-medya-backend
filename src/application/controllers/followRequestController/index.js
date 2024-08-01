const addFollowRequest = require("./addFollowRequest");
const updateFollowRequest = require("./updateFollowRequest");
const getFollowRequest = require("./getFollowRequest");

class FallowRequestController {
    addFollowRequest= addFollowRequest;
    updateFollowRequest=updateFollowRequest;
    getFollowRequest=getFollowRequest;
}

module.exports= FallowRequestController;