//imports the express and handlebars module
const express = require('express');
const exphbs = require('express-handlebars');
// const sass = require('node-sass');

// path module provides utilities for working with file and directory paths

const app = express();
const path = require('path');
//
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
  res.sendFile(__dirname + '/views/layouts/main.html');

});

app.get('/weather', (req, res) => {
  res.send('This page will show us the weather');
});

const PORT = process.env.PORT || 5000;

//create a server where browsers can connect to.
const listen = app.listen(PORT, () => {
  console.log('Listening on %s', PORT);
});

module.exports = listen;
