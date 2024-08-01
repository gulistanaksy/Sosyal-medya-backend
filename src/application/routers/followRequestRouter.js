const express =  require('express');
const router = express.Router();

const FollowRequestController = require("../controllers/followRequestController");
const followRequestController = new FollowRequestController();


router.post('/add', followRequestController.addFollowRequest);
router.put('/update', followRequestController.updateFollowRequest);
router.get('/follow-requests', followRequestController.getFollowRequest);


module.exports = router;

