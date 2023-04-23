const mongoose = require('mongoose');
const Joi= require('joi');

const User=mongoose.model('Users',new mongoose.Schema({
          name:{
                    type:String,
                    minlength:5,
                    maxlength:50,
                    required:true
          },
          email:{
                    type:String,
                    required:true,
                    minlength:5,
                    maxlength:255,
                    unique:true

          },
          password:{
                    type:String,
                    required:true,
                    minlength:5,
                    maxlength:1024
          }
}));

function validationUser(User){
          const schema={
                  name:Joi.string().min(3).required(),  //Joi.string().min(5).max(255).required(),
                  email:Joi.string().min(5).max(255).required().email(),
                  password:Joi.string().min(5).max(255).required()
          };
          return Joi.valid(User,schema);
};

exports.validationUser=validationUser;
exports.User=User;