const express = require('express');
//import personRouter from './personRouter'
const personRouter= require('./personRouter')
const userRouter=require('./userRouter')
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("merhaba")
})
router.use('/person/', personRouter);
router.use('/user/',userRouter)

//export default router ;
module.exports = router;
