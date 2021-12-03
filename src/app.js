const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodeUtils = require('./utils/geocode')
const weatherforecastUtils = require('./utils/weatherforecast')

const app = express();

//define paths for express
const publicDirectoryPath = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '/../templates/views');
const partialsPath = path.join(__dirname, '/../templates/partials');

//setup handlebars angine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); 
hbs.registerPartials(partialsPath);

//setup static page
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mikko'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mikko'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mikko'
    });
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const locationName = req.query.address;
    geocodeUtils.geocode(locationName, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        } 
        
        weatherforecastUtils.weatherforecast(latitude, longitude, (err, forecastResp) => {
            if(err) {
                return res.send({ error });
            }
            res.send({
                location: location,
                forecast: forecastResp,
                address: locationName
            });
        });
    })    

});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    
    console.log(req.query.search)
    res.send({
        products: []
    });
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Mikko',
        helpText: 'Help page not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Mikko',
        helpText: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});