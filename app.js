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

process.env.NODE_ENV = "dev"
let dbUrl = ''
if (process.env.NODE_ENV !== "dev") {
    require('dotenv').config()
    app.use(morgan('tiny'));
    dbUrl = process.env.DB_URL
}
else {
    dbUrl = 'mongodb://localhost/oijpcr'
    app.use(morgan('dev'));
}

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb' }))
// Mongo setup
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
console.log(dbUrl)
mongoose.connect(dbUrl, mongoOptions)
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

const apiData = async (request, response) => {
    if(process.env.NODE_ENV !== 'dev') {
        await console.log('access API data in production')
        response.redirect('/')
    } else {
        const journals = await Journal.find({})
        response.send(journals)
    }
}

app.get('/', homepage);
app.get('/api', apiData);
app.use('/journals', journalsRoute);
app.use('/submit', submitRoute);
app.use('/admin', adminRoute);
app.get('/podcast', podcast);

module.exports = app;