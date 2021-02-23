const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const method_override = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const Comment = require('./models/comment');
const Journal = require('./models/journal');
const journalsRoute = require('./routes/journals');
const adminRoute = require('./routes/admin');
const submitRoute = require('./routes/submitArticle');
const app = express();

/*-----------EJS Set Up------------*/
app.use(method_override('_method'))
app.engine('ejs', engine);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb'}))
// Mongo setup
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect('mongodb://localhost/oijpcr', mongoOptions)
.then(() => {
    console.log("Connected to MongoDB oijpcr");
})
.catch(err => {
    console.log("Error!")
    console.log(err)
})
// 
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
app.use('/journals', journalsRoute);
app.use('/submit', submitRoute);
app.use('/admin', adminRoute);
app.get('/podcast', podcast);

module.exports = app;