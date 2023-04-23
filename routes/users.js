const express=require('express');
const {User,validationUser}=require('../Models/user');
const _= require('lodash');
const bcrypt=require('bcrypt');

const router=express.Router();

router.post('/',async(req,res)=>{
          const {erorr}=validationUser(req.body);
          if (erorr) return res.status(400).send(erorr);
          try {
                    let user=await User.findOne({email: req.body.email});
                    if(user) return res.status(400).send("user alrady registerd ...")
                    user=new User(_.pick(req.body,['name','email','password']));
                    const salt=await bcrypt.genSalt(10);
                    const hash=await bcrypt.hash(user.password,salt);
                   
                    await user.save();
                    res.send(_.pick(user,['_id', 'name','email'])); 
          } catch (ex) {
                    console.log(ex);
                    return res.status(500).send(ex);
          }
})

module.exports=router;