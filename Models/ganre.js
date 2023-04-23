const mongoose = require('mongoose');
const Joi= require('joi');



const GanresSchema=new mongoose.Schema({
          name:{
            type:String,
            required:true,
            minlength:5,
            maxlength:255
          },
          category:{
            type:String,
            enum:['horerr','deram','comedy']
          },
          date:{type:Date,default:Date.now},
          isPublished:Boolean,
        
});
const Ganres=mongoose.model('ganres',GanresSchema);

async function validationGenre(genre){
          const schema={
                    name:Joi.string().min(3).required()
          }
         return  Joi.valid(genre,schema);
          //return Joi.validateAsync(genre,schema);
}

exports.GanresSchema=GanresSchema;
exports.Ganres=Ganres;
exports.validate=validationGenre;