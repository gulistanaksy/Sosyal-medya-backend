const addPost = require("./addPost")
const getPost = require("./getPost")
const updatePost = require("./updatePost")

class PostController {
     addPost = addPost;
     getPost = getPost;
     updatePost=updatePost;
}

module.exports = PostController;