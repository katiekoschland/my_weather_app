//imports the express and handlebars module
const express = require('express');
const exphbs = require('express-handlebars');
// const sass = require('node-sass');

// path module provides utilities for working with file and directory paths
const app = express();

const request = require('request');
const apiKey = '948bcac04c4c2646c9fcd6f1d5d4b4d0';

// const path = require('path');
// const weather = require( path.resolve( __dirname, "./weather.js" ));

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

app.post('/', function(req, res) {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  request(url, function (err, response, body) {
    if(err){
      res.render((__dirname + '/views/layouts/main.html'), {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined){
        res.render('main', {weathher: null, error: 'Error, please try again'});
      } else {
      let celsius = (weather.main.temp - 273.15).toFixed(2);
      let message = `It's ${celsius} degrees in ${weather.name}!`;
      res.render((__dirname + '/views/layouts/main.html'), { weather: message});
      // res.send(message);
    }
  }
  });
});

// app.post('/weather', function (req, res) {
//   console.log(req.body.city);
//   res.render('index');
// })
const PORT = process.env.PORT || 5000;

//create a server where browsers can connect to.
const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});

module.exports = listen;
