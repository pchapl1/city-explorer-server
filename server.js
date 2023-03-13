'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;

// const getWeather = require('./modules/weather.js');
const getWeather = require('./modules/weather')
const getMovies = require('./modules/movies')
const app = express();
app.use(cors())

// app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   getWeather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

app.listen(PORT, () => console.log(`Server up on ${PORT}`));