//imports the express and handlebars module
const express = require('express');
const exphbs = require('express-handlebars');
const env = require('node-env-file');

const app = express();

if (!process.env.PRODUCTION) {
    env(__dirname + '/.env');
}


const request = require('request');

// To handle HTTP POST reuest in express, you need to install the module body-parsser. It extracts the entire body portion of an incoming request stream
// and exposes it on req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.html'
});

//setup handlebars as the view engine
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

//to serve static files such as images, css files etc.
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.render(__dirname + '/views/layouts/main.html');
});

app.post('/', (req,res) => {
    const city = req.body.city;
    console.log(process.env.API_KEY)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    request(url, (err, response, body) => {
        if(err){
            res.render((__dirname + '/views/layouts/main.html'), {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            if (weather.main === undefined){
                res.render((__dirname + '/views/layouts/main.html'), {weather: null, error: 'Error, please try again'});
            } else {
                const celsius = (weather.main.temp - 273.15).toFixed(2);
                const fahrenheit = (((weather.main.temp - 273.15) * 1.8) + 32).toFixed(2);
                const weatherCelsius = `It's ${celsius} degrees in ${weather.name}!`;
                const weatherFahrenheit = `(${fahrenheit} fahrenheit)`;
                let sun;
                let cloud;
                if (celsius> 20) {
                    sun = true;
                } else {
                    cloud = true;
                }
                res.render((__dirname + '/views/layouts/main.html'), { weatherCelsius: weatherCelsius, weatherFahrenheit: weatherFahrenheit, sun: sun});
            }
        }
    });
});

const PORT = process.env.PORT || 5000;

//create a server where browsers can connect to.
const listen = app.listen(PORT, () => {
    console.log('Listening on %s', PORT);
});

module.exports = listen;
