
//
// const request = require('request');
//
// const apiKey = '948bcac04c4c2646c9fcd6f1d5d4b4d0';
// const city = 'london';
// const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//
// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     let weather = JSON.parse(body);
//     let celsius = (weather.main.temp - 273.15).toFixed(2);
//     let message = `It's ${celsius} degrees in ${weather.name}!`;
//     console.log(message);
//   }
// });
//
// module.exports;
