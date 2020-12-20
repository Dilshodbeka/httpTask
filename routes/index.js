const express = require('express');
const router = express.Router();
const axios = require('axios')
require('dotenv').config()

router.get('/', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://api.weatherbit.io/v2.0/current?city=gliwice,Pl&key=${process.env.Master_API_Key}`)
        const gifAPI = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_kEY}&tag=&rating=g`)
        const jokeAPI = await axios.get('https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist')
        const imgOfGifs = gifAPI.data.data.image_url;
        const textOfGifs = gifAPI.data.data.title;
        const textofJoke = jokeAPI.data.setup
        const categorytofJoke = jokeAPI.data.category
            res.render('index', {
                title: "Главная",
                lineOfNews: newsAPI.data.data,
                imgOfGifs: imgOfGifs,
                textOfGifs: textOfGifs,
                textofJoke:textofJoke,
                categorytofJoke: categorytofJoke
            });
    }catch (err) {
        if (err.response) {
            res.render('index', {
                title: "Главная",
                lineOfNews : null 
            })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest){
            res.render('index', {
                title: "Главная",
                lineOfNews : null 
            })
            console.log(err.requiest)
        } else {
            res.render('index', {
                title: "Главная",
                lineOfNews : null 
            })
            console.log(err.message)
        }
    }
});


module.exports = router