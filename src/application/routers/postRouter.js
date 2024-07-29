const express =  require('express');
const PostController= require('../controllers/postController')

const postController = new PostController();

const router = express.Router();

router.post('/add', postController.addPost);
router.get("/",postController.getPost);
router.put("/update", postController.updatePost);


module.exports = router;

