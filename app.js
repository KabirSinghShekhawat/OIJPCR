const express = require('express');
const app = express().disable("x-powered-by");
const cors = require('cors');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const method_override = require('method-override');
const session = require('express-session');
const flash= require('connect-flash')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const path = require('path');

// Routes
const journalsRoute = require('./routes/journals');
const adminRoute = require('./routes/admin');
const submitArticleRoute = require('./routes/submitArticle');
const homeRoute = require('./routes/home');
const podcastRoute = require('./routes/podcast');
require('dotenv').config()

/*-----------Global Middlewares------------*/

// Helmet

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
// cors
app.use(cors());
// Rate Limiter

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later'
});

app.use('/admin', limiter);

// Method Override
app.use(method_override('_method'))

// App Engine
app.engine('ejs', engine);
app.set('view engine', 'ejs')

// Set Views
app.set('views', path.join(__dirname, 'views'))

app.use('/', express.static(path.join(__dirname, 'public')))
/**
 * Session 
 */

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(flash())

// process.env.NODE_ENV = "dev"
// process.env.NODE_ENV = "production"

let dbUrl
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

/** 
 *Mongo setup
*/

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

/**
 * ROUTES
 */
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', homeRoute);
app.use('/journals', journalsRoute);
app.use('/submit', submitArticleRoute);
app.use('/podcast', podcastRoute);
app.use('/admin', adminRoute);
app.get('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

module.exports = app;