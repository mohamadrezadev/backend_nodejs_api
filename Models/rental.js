const mongoose = require('mongoose');
const Joi= require('joi');
Joi.objectid= require('joi-objectid')(Joi);

const Rental=mongoose.model('rental',new schema({
          coustomer:new mongoose.schema({
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
          }),
          movie:new mongoose.schema({
                    title:{
                              type:String,
                              required:true,
                              trim:true,
                              minlength:5,
                              maxlength:255
          
                    },
                    numberInstock:{
                              type:Number,
                              required:true,
                              min:0,
                              max:255
          
                    },
                    dailyRentalRate:{
                              type:Number,
                              required:true,
                              min:0,
                              max:255
                    },
                    required:true  
          }),
          dateout:{
                    type:Date,
                    required:true,
                    default:Date.now
          },
          dateReturned:{
                    type:Date
          },
          retntalFee:{
                    type:Number,
                    min:0
          }

}));

function validationRental(Rental){
          const schema={
                    costomerId:Joi.objectid().required(),
                    movieId:Joi.objectid().required()
          }
          return Joi.validate(Rental,schema);
}

exports.Rental=Rental;
exports.validate=validationRental;
