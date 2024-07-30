const express =  require('express');
const router = express.Router();

const PostController= require('../controllers/postController')
const postController = new PostController();


router.post('/add', postController.addPost);
router.get("/",postController.getPost);
router.put("/update", postController.updatePost);


module.exports = router;

