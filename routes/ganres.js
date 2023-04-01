const express=require('express');
const router=express.Router();

const genres=[
          {id:1,name:'action'},
          {id:2,name:'Horror'},
          {id:3,name:'Romance'},
]
router.get('/',(req,res)=>{
          res.send(genres);
});
router.get('/:id',(req,res)=>{
          const genre=genres.find(g=>g.id===parseInt(req.params.id));
          if(!genre) return res.status(404).send('the genre with th given id ');
          res.send(genre);
});
router.post('/',(req,res)=>{
          const {erorr} =validationcourse(req.body);
          if(erorr)return res.status(400).send(error.details[0].message);   
          const new_genre={
                 id:genres.length+1,
                 name:req.body.name,
          };
          genres.push(new_genre);
          res.send(new_genre);
});
     
router.put('/:id',(req,res)=>{
          const genre=courses.find(c=>c.id==parseInt(req.params.id));
          if(!genre)return res.status(404).send('the genre with the given ID was not found');
           
          const {erorr} = validationcourse(req.body);
          if(erorr){
                return res.status(400).send(error.details[0].message);
                 
          }
          genre.name=req.body.name;
         
          res.send(genre);
       
   });
   
function validationGenre(genre){
          const schema={
                    name:Joi.string().min(3).required()
          }
          return Joi.validate(genre,schema);
}
module.exports=router;