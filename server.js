'use strict';

//REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios')

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

app.get('/weather', async (req, res, next) => {
    let cityToFind = req.query.city

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${cityToFind}&key=${process.env.WEATHER_API_KEY}&days=3`

    console.log(url)

    try {
        let resultCity = await axios.get(url)
        console.log(resultCity.data)
        let selectedCity = resultCity.data.data.map(item => new ForeCast(item))
        res.send(selectedCity)
    } catch (error) {
        console.log(error)
    }

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