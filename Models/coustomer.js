const mongoose = require('mongoose');
const Joi= require('joi');
const url = 'mongodb://localhost:27018/mydb';
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB.', err));


const CoustomerSchema=new mongoose.Schema({
          name:{
            type:String,
            required:true,
            minlength:5,
            maxlength:50
          },
          isGold:Boolean,
          phone:{
                    type:String,
                    required:true,
                    minlength:5,
                    maxlength:50
          },
});
const Coustomer=mongoose.model('coustomer',CoustomerSchema);

function validatecoustomer(coustomer)
{
          const schema={
                    name:Joi.string().min(3).required(),
                    phone:Joi.string().min(5).required(),
                    isGold:Joi.boolean()
          }
          return Joi.validate(coustomer,schema);
}

exports.Coustomer=Coustomer;
exports.validate=validatecoustomer;