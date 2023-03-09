'use strict';
const axios = require('axios')

async function getMovies(req, res, next){
    // console.log('in get movies')
    try {
        let cityToFind = req.query.city

        let params = {
            api_key: process.env.TMDB_API_KEY,
            query: cityToFind
        }

        let url = `https://api.themoviedb.org/3/search/movie`

        let resultMovies = await axios.get(url, { params })

        res.send(resultMovies.data.results)
    } catch (error) {
        Promise.resolve().then(()=>{
            throw new Error(error.message);
        }).catch(next)
    }

}

class Movie {
    constructor(movieObject) {
        this.title = movieObject.title,
        this.overview = movieObject.overview, 
        this.image = movieObject.image_url
    }
}

module.exports = getMovies;