const https = require('https');
const api = require('./api.json');

// Print out temp details
// Print out error message

function printWeather(temperature, conditions){
  console.log('The weather in Fredericton is:');
  console.log(`Conditions: ${conditions}  Temperature: ${temperature}` );
}

function get(query) {
    const request = https.get('https://api.openweathermap.org/data/2.5/forecast?id=5957776&APPID=24d36a37de14a583f6b73b49104e20e8', response => {
   // const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
        let body = "";
        // Read the data
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
            const weather = JSON.parse(body);
            const temp =Math.floor(weather.list[0].main.temp - 273.15);
            printWeather(temp, weather.list[0].weather[0].description);
           // console.dir(weather.list[0].weather);
            //Parse data
            //Print the data
        });
    });
}

module.exports.get = get;

//TODO: Handle any errors