const request = require('request');

const weatherforecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e8f648495d314492929472ded2a2013b&query=' + lat + ',' + long + '&units=m';

    request({ url: url, json: true }, (error, { body }) => {
        //low level error -> internet poikki tms
        if(error) {
            callback('Unable to connect to the geoserver!', undefined);
        } else if(body.error) {
            //High level error -> dataa ei löydy tms
            callback('Unable to find center', undefined);
        } else {
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const description = body.current.weather_descriptions[0];
            const message = description + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.';
            callback(undefined, message);
        }
    });
}


module.exports = {
    weatherforecast: weatherforecast,
}