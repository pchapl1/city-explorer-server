'use strict';
const axios = require('axios')
let cache = require('./cache.js');

async function getMovies(req, res, next){
    let cityToFind = req.query.city
    const key = 'movies'
    let params = {
        api_key: process.env.TMDB_API_KEY,
        query: cityToFind
    }
    let url = `https://api.themoviedb.org/3/search/movie`

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {

        // send cache data
        res.status(200).send(cache['movies'])
    }
    else {

        

        axios.get(url, { params })
            .then(resultsFromApi => resultsFromApi.data.results.map(item => new Movie(item)))
            .then(console.log('results from api: ', resultsFromApi))
            .then(dataToSend => res.status(200).send(dataToSend))
            .catch(err => console.error(err))
        }
    }
        

class Movie {
    constructor(movieObject) {
        this.id = movieObject.id,
        this.title = movieObject.title,
        this.overview = movieObject.overview, 
        this.vote_average = movieObject.vote_average,
        this.vote_count = movieObject.vote_count,
        this.popularity = movieObject.popularity,
        this.release_date = movieObject.release_date,
        this.poster_path = movieObject.poster_path
    }
}

module.exports = getMovies;