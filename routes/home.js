const express=require('express');
const router=express.Router();
router.use(function(req,res,next){
          console.log("authenticating.. ");
          next();
   })
module.exports=router;