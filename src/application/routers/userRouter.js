const express = require('express')
const UserController = require('../controllers/userController');
const userController = new UserController();
const router = express.Router();

router.post('/create',userController.userCreate)

module.exports=router;