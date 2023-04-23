const express=require('express');
const {User}=require('../Models/user');
const Joi= require('joi');
const _= require('lodash');
const bcrypt=require('bcrypt');
const router=express.Router();

router.post('/',async(req,res)=>{
          const {erorr}=validate(req.body);
          if (erorr) return res.status(400).send(erorr.details[0].message);

          let user=await User.findOne({email:req.body.email});
          if(user) return res.status(400).send("Invalid email or password");

          const validpassword=await bcrypt.compare(req.password.body,user.password);
          if(!validpassword) return res.status(400).send("Invalid email or password");

          res.send(true);

});

function validation(req){
          const schema={
                  email:Joi.String().min(5).max(255).required().email(),
                  password:Joi.String().min(5).max(255).required(),
          }
          return Joi.validate(req,schema);
}
module.exports=router;
