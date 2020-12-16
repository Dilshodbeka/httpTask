const express = require('express');
const router = express.Router();
const axios = require('axios')

const numOneKey = process.env.Master_API_Key; 
router.get('/', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://api.weatherbit.io/v2.0/current?city=gliwice,Pl&key=${numOneKey}`)
        res.render('index', {
        title: "Главная",
        lineOfNews : newsAPI.data.data
    });
    } catch (error) {
        if (error.response) {
            throw error.response.data
            throw error.response.status
            throw error.response.headers
        } else if (error.requiest){
            throw error.requiest
        } else {
            throw error.message
        }
    }
});


module.exports = router