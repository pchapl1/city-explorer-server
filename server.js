'use strict';

//REQUIRE
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');


//USE
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// ROUTES
app.get(`/`, ( req, res )=>{
    res.send('hello from our server');
});

app.get('/weather', getWeather );

app.get('/movies', getMovies);

//Error handler
app.use((error, req, res, next)=> {
    res.status(500).send(error.message)
})


app.get('*', (req, res) => {
    res.send('404 Error')
})

app.listen(PORT, ()=> console.log(`listening on Port ${PORT}`));