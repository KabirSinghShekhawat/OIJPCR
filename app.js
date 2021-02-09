const express = require('express');
const morgan = require('morgan');
const app = express();
const method_override = require('method-override');
const path = require('path');

/*-----------EJS Set Up------------*/

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(method_override('_method'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const homepage = (request, response) => {
    response.render('home');
}

app.get('/', homepage);

module.exports = app;