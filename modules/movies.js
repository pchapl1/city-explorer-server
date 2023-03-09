'use strict';
const axios = require('axios')

async function getMovies(req, res, next){
    let cityToFind = req.query.city

    let params = {
        api_key: process.env.TMDB_API_KEY,
        query: cityToFind
    }

    let url = `https://api.themoviedb.org/3/search/movie`
    let test = await axios.get(url, {params})
    console.log(test.data.results)
    axios.get(url, { params })
        .then(resultsFromApi => resultsFromApi.data.results.map(item => new Movie(item)))
        .then(dataToSend => res.status(200).send(dataToSend))
        .catch(err => console.error(err))
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