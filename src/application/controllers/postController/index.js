const addPost = require("./addPost")
const getPost = require("./getPost")
class PostController {
     addPost = addPost;
     getPost = getPost;
}

module.exports = PostController;