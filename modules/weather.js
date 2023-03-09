'use strict';
const axios = require('axios')


async function getWeather (req, res, next){
        console.log('in get weather')
        let cityToFind = req.query.city

        let params = {
            city: cityToFind, 
            key: process.env.WEATHER_API_KEY,
            days: 3
        }

        let url = `https://api.weatherbit.io/v2.0/forecast/daily`;

        // let data = await axios.get(url, {params})
        // console.log(data)

        axios.get(url, {params})
            .then(resultsFromApi => resultsFromApi.data.data.map(item => new ForeCast(item)))
            .then(dataToSend => res.status(200).send(dataToSend))
            .catch(err => console.error(err))

}

class ForeCast {
    constructor(WeatherObject) {
        this.date = WeatherObject.valid_date,
        this.description = `Low of ${WeatherObject.low_temp}, high of ${WeatherObject.max_temp} with ${WeatherObject.weather.description.toLowerCase()}`
    }
}

module.exports = getWeather;