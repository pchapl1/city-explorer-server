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
    let cityToFind = req.query.city

    // console.log(weatherData)
    let resultCity = weatherData.find(city => city.city_name === cityToFind)
    // console.log("result city: ", resultCity)


    let selectedCity = resultCity.data.map(item => new ForeCast(item))
    // console.log("selected city: ", selectedCity)
    res.send(selectedCity)
})
class ForeCast {
    constructor(WeatherObject) {
        this.date = WeatherObject.valid_date,
        this.description = `Low of ${WeatherObject.low_temp}, high of ${WeatherObject.max_temp} with ${WeatherObject.weather.description.toLowerCase()}`
    }
}



//Error handler
app.use((error, req, res, next)=> {
    res.status(500).send(error.message)
})


app.get('*', (req, res) => {
    res.send('404 Error')
})

app.listen(PORT, ()=> console.log(`listening on Port ${PORT}`));