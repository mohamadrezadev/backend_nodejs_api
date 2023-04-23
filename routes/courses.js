const express=require('express');
const Joi= require('joi');
const router=express.Router();
const courses=[
          {id:1,name:"alireza"},  
          {id:2,name:"reza"}, 
          {id:3,name:"mohamad"}, 
     ];
     //middleware
     
     router.get('/',(req,res)=>{
            //res.render('index',{title:'my express app',message:'hello welcome my app'})
        res.send("hello world!!!!! ");     
     });
     router.get('',(req,res)=>{
         res.send(courses);
     })
     router.get('/:id',(req,res)=>{
            const course=courses.find(c=>c.id==parseInt(req.params.id));
            if(!course)res.status(404).send('the course with the given ID was not found');
            res.send(course);
     })
     router.get('/:year/:month',(req,res)=>{
            res.send(req.params);
     })
     //request post
     router.post('/',(req,res)=>{
            const {erorr} =validationcourse(req.body);
            if(erorr)return res.status(400).send(error.details[0].message);   
            const new_course={
                   id:courses.length+1,
                   name:req.body.name,
            };
            courses.push(new_course);
            res.send(new_course);
     })
     
     router.put('/:id',(req,res)=>{
            const course=courses.find(c=>c.id==parseInt(req.params.id));
            if(!course)return res.status(404).send('the course with the given ID was not found');
             
            const {erorr} = validationcourse(req.body);
            if(erorr){
                  return res.status(400).send(error.details[0].message);
                   
            }
            course.name=req.body.name;
           
            res.send(course);
         
     });
     
     
     
     // request delete 
     router.delete('/:id',(req,res)=>{
            const course=courses.find(c=>c.id==parseInt(req.params.id));
            if(!course)return res.status(404).send('the course with the given ID was not found');
             
            const index=courses.indexOf(course);
            courses.splice(index,1);
            res.send(course);
     });
     
     
     function validationcourse(course){
            const schema={
                   name:Joi.string().min(3).required()
            };
            const result=Joi.validate(course,schema);
            console.log(result);
            return result;
     }
module.exports= router;