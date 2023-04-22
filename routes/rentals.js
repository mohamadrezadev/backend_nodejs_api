const express=require('express');
const {Movie}=require('../Models/movie');
const {Coustomer}= require('../Models/coustomer');
const fawn= require('fawn');

const{Ganres}=require('../Models/ganre');
const{Rental,validate, Rental}=require('../Models/rental');

const router=express.Router();

router.get('/',async(req,res)=>{
          const result=await Rental.find().sort('-datout');
          res.send(result);
})

router.post('/',async(req,res)=>{
          const {erorr}=validate(req.body);
          if(erorr) return res.status(400).send(erorr.details[0].message);
          const coustomer=await Coustomer.findById(req.body.coustomerId);
          if(!coustomer)return res.status(400).send("Invalid coustomer");
          const movie=await Movie.findById(req.body.movieId);
          if(!movie) return res.status(400).send("Invalid Movie");

          if(movie.numberInstock==0)return res.status(400).send("movie not in stock");

          let rental=new Rental({
                    coustomer:{
                              _id:coustomer.id,
                              name:coustomer.name,
                              phone:coustomer.phone
                    },
                    movie:{
                              _id:movie.id,
                              title:movie.title,
                              dailyRentalRate:movie.dailyRentalRate
                    },
          });
          try {
                    fawn.Task()
                    .save('rentals',rental)
                    .update('movies', { _id: movie._id }, {$inc: {numberInStock :-1} })
                    .run() 
                    // rental=await rental.save();
                    // movie.numberInstock--;
                    // movie.save();
                    res.send(rental);
          } catch (error) {
                    res.status(500).send(error);
          }
         
          
});