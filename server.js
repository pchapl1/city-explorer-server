'use strict';

//REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//syntax for getting data 
let weatherData = require("./weather.json")

//USE
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// ROUTES
app.get(`/`, ( req, res )=>{
    res.send('hello from our server')
})

app.get('/weather', (req, res, next)=> {
    console.log(weatherData)

    res.send(weatherData)
})


// get animal by species
// app.get('/pet', (req, res, next)=>{
//     try {
//         let speciesRequested = req.query.species;

//         let petObject = speciesRequested.find(pet => pet.species === species)
    
//         let selectedPet = new Pet(petObject)
    
//         res.send(selectedPet)
        
//     } catch (error) {
//         next(error)
//     }
// })

// // CLASSES
// class Pet {
//     constructor(PetObject) {
//         this.name = PetObject.name,
//         this.breed = PetObject.breed
//     }
// }


//Error handler
app.use((error, req, res, next)=> {
    res.status(500).send(error.message)
})


app.get('*', (req, res) => {
    res.send('404 Error')
})

app.listen(PORT, ()=> console.log(`listening on Port ${PORT}`));