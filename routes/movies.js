const express=require('express');
const {Movie,validate}=require('../Models/movie');
const{Ganres}=require('../Models/ganre');
const router=express.Router();

router.post('/',async(req,res)=>{
          const {erorr}=validate(req.body);
          console.log(erorr);
          if(erorr) return res.status(400).send(erorr.details[0].message);

          const ganre =await Ganres.findById(req.body.ganreid);
          if (!ganre) return res.status(400).send('Invalid ganre .');
          const movie=new Movie({
                    title:req.body.title,
                    ganre:ganre,
                    numberInstock:req.body.numberInstock,
                    dailyRentalRate:req.body.dailyRentalRate
          })
          await movie.save();
          res.send(movie);
          
})

module.exports=router;