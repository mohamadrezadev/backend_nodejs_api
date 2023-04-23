const mongoose = require('mongoose');
const joi= require('joi');
joi.objectid= require('joi-objectid')(joi);
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


function validationMovie(movie){
          const schema={
                    title:joi.string().min(5).max(2550).required(),
                    ganreid:joi.objectid().required(),
                    numberInstock:joi.number().min(0).required(),
                    dailyRentalRate:joi.number().min(0).required()
          }
          return joi.validate(movie,schema);
}

exports.Movie=Movie;
exports.validate=validationMovie;
