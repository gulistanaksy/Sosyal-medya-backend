const express =  require('express');
const CommentController= require('../controllers/commentController')

const commentController = new CommentController();

const router = express.Router();

router.post('/add', commentController.addComment);

// router.get("/",postController.getPost);
// router.put("/update", postController.updatePost);


module.exports = router;

