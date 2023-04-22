const mongoose = require('mongoose');
const Joi= require('joi');
Joi.objectid= require('joi-objectid')(Joi);
const {GanresSchema}=require('./ganre');


const Movie=mongoose.model('movies',new mongoose.Schema({
          title:{
                    type:String,
                    required:true,
                    trim:true,
                    minlength:5,
                    maxlength:255

          },
          ganre:{
                    type:GanresSchema,
                    required:true
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
          }

}))


function validationMovie(Movie){
          const schema={
                    title:Joi.string().min(5).max(2550).required(),
                    ganreid:Joi.objectid().requireD(),
                    numberInstock:Joi.number().min(0).required(),
                    dailyRentalRate:Joi.number().min(0).requireD()
          }
          return Joi.validate(Movie,schema);
}

exports.Movie=Movie;
exports.validate=validationMovie;
