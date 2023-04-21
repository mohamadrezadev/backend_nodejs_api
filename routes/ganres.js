const express=require('express');
const {Ganres,validate}=require('../Models/ganre');
const router=express.Router();


router.get('/',async (req,res)=>{
       const result=await Ganres.find();
       res.send(result);
});
router.get('/:id',async (req,res)=>{
          const genre=await Ganres.findById({_id:req.params.id}) ;
          if(!genre) return res.status(404).send('the genre with th given id ');
          res.send(genre);
});
router.post('/',async (req,res)=>{
          const {erorr} =validate(req.body);
          if(erorr)return res.status(400).send(error.details[0].message);  
          const ganre=new Ganres({
              name:req.body.name,
              category:req.body.category,
              isPublished:req.body.isPublished
              });
          const result=await ganre.save(); 
          res.send(result);
});
     
router.put('/:id',async (req,res)=>{
       //    const genre=courses.find(c=>c.id==parseInt(req.params.id));
          const genre=await Ganres.findById({_id:req.params.id});
          if(!genre)return res.status(404).send('the genre with the given ID was not found');
           
          const {erorr} = validate(req.body);
          if(erorr){
                return res.status(400).send(error.details[0].message);
                 
          }
          const result =await Ganres.findByIdAndUpdate({_id:req.params.id},
              {
              $set:{
                     name:req.body.name,
                     category:req.body.category,
                     isPublished:req.body.isPublished
              }
            });
          res.send(result);
       
   });
router.delete('/:id',async (req,res)=>{
       const result=await Course.findByIdAndRemove(req.params.id);
       res.send(result);
});

module.exports=router;