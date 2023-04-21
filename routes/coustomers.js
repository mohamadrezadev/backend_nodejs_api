const {Coustomer,validate}=require('../Models/coustomer')
const express=require('express');
const router=express.Router();




router.post('/',async(req,res)=>{
          const {erorr}=validate(req.body);
          if(erorr) return res.status(400).send(error.details[0].message);
          let costomer=new Coustomer({
                    name:req.body.name,
                    phone:req.body.phone
          });
          var result=await costomer.save();
          res.send(result);
})


module.exports=router;