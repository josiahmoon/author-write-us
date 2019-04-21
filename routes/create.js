const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '659e35adac5f4f672f5ddc64be6611f1';

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: true }));
router.set('view engine', 'ejs');

router.get('/create', (req, res) => {
    res.render('AWU.ejs', {weather: null, error: null});
});

router.post('/create', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, (err, response, body) => {
        if(err){
            res.render('AWU.ejs', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('AWU.ejs', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('AWU.ejs', {weather: weatherText, error: null});
            }
        }
    });
});

module.exports = router;

// app.listen(3499, function () {
//     console.log('Listening on port 3499...')
// });