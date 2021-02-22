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
const app = express();

/*-----------EJS Set Up------------*/
app.engine('ejs', engine);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(method_override('_method'))

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb'}))
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
        css: 'admin.css',
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
    const options = {
        title: 'Journals',
        css: 'app.css',
        isHomePage: false,
        journals: journals
    }
    response.render('journals', options);
}

const getJournal = async (request, response) => {
    const { id } = request.params;
    const journal = await Journal.findById(id);
    const options = {
        title: 'Journal',
        css: 'app.css',
        isHomePage: false,
        journal: journal
    }
    response.render('readJournal', options);
}

const admin = async (request, response) => {
    const journals = await Journal.find({})
    const options = {
        title: 'Admin',
        css: 'app.css',
        journals: journals,
        isHomePage: false,
    }
    response.render('admin', options);
}

const postComment = (request, response) => {
    console.log(request.body)
    response.redirect('/journals');
}

const postArticle = (request, response) => {
    console.log(request.body) 
    response.redirect('/');
}

const postJournal = async (request, response) => {
    const { author, title, editordata } = request.body;
    console.log(request.body)
    const newJournal = {
        author: author,
        title: title,
        content: editordata
    }
    const journal = new Journal(newJournal);
    await journal.save();
    response.redirect('/admin');
}

const addJournal = (request, response) => {
    const options = {
        title: 'Add New Journal',
        css: 'app.css',
        isHomePage: false,
    }
    response.render('newJournal', options)
}

app.get('/', homepage);
app.get('/journals', journals);
app.get('/journals/:id', getJournal);
app.get('/podcast', podcast);
app.get('/submit', submitArticle);
app.get('/admin', admin);
app.get('/admin/journal', addJournal);

app.post('/journals/:id', postComment);
app.post('/submit', postArticle);
app.post('/admin/journal', postJournal);

module.exports = app;