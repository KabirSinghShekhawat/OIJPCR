const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const method_override = require('method-override');
const path = require('path');
const app = express();

/*-----------EJS Set Up------------*/
app.engine('ejs', engine);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(method_override('_method'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const homepage = (request, response) => {
    const options = {
        title: 'OIJPCR', 
        css: 'app.css',
        isHomePage: true
    }
    response.render('home', options);
}

const podcast = (request, response) => {
    const options = {
        title: 'Podcast', 
        css: 'app.css',
        isHomePage: false
    }
    response.render('podcast', options);
}
app.get('/', homepage);
app.get('/podcast', podcast);

module.exports = app;