const express = require('express');
const morgan = require('morgan');
const engine = require('ejs-mate');
const method_override = require('method-override');
const path = require('path');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Journal = require('./models/journal');
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
// Mongo setup
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect('mongodb://localhost/oijpcr', mongoOptions)
.then(() => {
    console.log("Connected to MongoDB oijpcr");
})
.catch(err => {
    console.log("Error agaya yaar!")
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

const submitArticle = (request, response) => {
    const options = {
        title: 'Submit Articles',
        css: 'app.css',
        isHomePage: false
    }
    response.render('submit', options);
}

const journals = async (request, response) => {
    const journals = await Journal.find({});
    response.render('journals', { journals })
}

const getJournal = async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    console.log(id);
    const journal = await Journal.findById(id);
    response.render('readJournal', { journal });
}

const postComment = (request, response) => {
    console.log(request.body)
    response.redirect('/journals');
}

const postArticle = (request, response) => {
    console.log(request.body) 
    response.redirect('/');
}

app.get('/', homepage);
app.get('/journals', journals);
app.get('/podcast', podcast);
app.get('/submit', submitArticle);
app.get('/journals/:id', getJournal);
app.post('/journals/:id', postComment);
app.post('/submit', postArticle);

module.exports = app;