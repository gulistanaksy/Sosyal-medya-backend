const express = require('express')
const UserController = require('../controllers/userController');
const userController = new UserController();
const router = express.Router();

router.get('/listAllUsers',userController.listAllUsers)

module.exports=router;