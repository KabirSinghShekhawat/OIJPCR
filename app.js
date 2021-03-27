const express = require('express');
const app = express();
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const method_override = require('method-override');
const session = require('express-session');
const path = require('path');

// Routes
const journalsRoute = require('./routes/journals');
const adminRoute = require('./routes/admin');
const submitArticleRoute = require('./routes/submitArticle');
const homeRoute = require('./routes/home');
const podcastRoute = require('./routes/podcast');
require('dotenv').config()

/*-----------EJS Set Up------------*/
app.use(method_override('_method'))

app.engine('ejs', engine);
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// process.env.NODE_ENV = "dev"
// process.env.NODE_ENV = "production"
let dbUrl = ''
if (process.env.NODE_ENV !== "dev") {
    app.use(morgan('tiny'));
    dbUrl = process.env.DB_URL
}
else {
    dbUrl = 'mongodb://localhost/oijpcr'
    app.use(morgan('dev'));
}


app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '5mb' }))

// Mongo setup
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect(dbUrl, mongoOptions)
    .then(() => {
        console.log("Connected to MongoDB oijpcr");
    })
    .catch(err => {
        throw new Error(`Error Message: ${err.message}`);
    })

app.use('/', homeRoute);
app.use('/journals', journalsRoute);
app.use('/submit', submitArticleRoute);
app.use('/podcast', podcastRoute);
app.use('/admin', adminRoute);

module.exports = app;