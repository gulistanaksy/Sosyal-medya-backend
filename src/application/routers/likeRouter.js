const express = require("express");
const router = express.Router();

const LikeController = require("../controllers/likeControllers");
const likeControllers = new LikeController();

router.use("/add", likeControllers.addLike);

module.exports= router;
