const mongoose = require('mongoose');
const Joi= require('joi');


const url = 'mongodb://localhost:27018/mydb';
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB.', err));


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

function validationGenre(genre){
          const schema={
                    name:Joi.string().min(3).required()
          }
          return Joi.validate(genre,schema);
}

exports.Ganres=Ganres;
exports.validate=validationGenre;