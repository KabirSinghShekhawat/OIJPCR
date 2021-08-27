const express = require('express')
const app = express().disable('x-powered-by')
const cors = require('cors')
const engine = require('ejs-mate')
const mongoose = require('mongoose')
const morgan = require('morgan')
const method_override = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const path = require('path')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
// Routes
const journalsRoute = require('./routes/journals')
const adminRoute = require('./routes/admin')
const submitArticleRoute = require('./routes/submitArticle')
const homeRoute = require('./routes/home')
const podcastRoute = require('./routes/podcast')
const editorRoute = require('./routes/editor')
const unhandledExceptionListener = require('./utils/unhandledExceptionListener')
require('dotenv').config()

process.on('uncaughtException', err => {
  unhandledExceptionListener('UNHANDLED EXCEPTION', err)
})

/*-----------Global Middlewares------------*/

// Helmet

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
)
// CORS
app.use(cors())
// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests, try again later',
})

app.use('*', limiter)

// Method Override
app.use(method_override('_method'))

// App Engine
app.engine('ejs', engine)
app.set('view engine', 'ejs')

// Set Views
app.set('views', path.join(__dirname, 'views'))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'public/img')))
/**
 * Session
 */

// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false,
// }))

// app.use(flash())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '5mb' }))

let mongoConnectionString

if (process.env.NODE_ENV === 'prod') {
  app.use(morgan('tiny'))
  mongoConnectionString = process.env.MONGO_URI
} else {
  app.use(morgan('dev'))
  mongoConnectionString = 'mongodb://localhost/oijpcr'
}

/**
 * Connect to mongo
 */

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect(mongoConnectionString, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB: OIJPCR 🐦 🐦 🐦')
  })
  .catch(err => {
    throw new Error(`Error Message: ${err.message}`)
  })


// app.use((req, res, next) => {
//   res.locals.success = req.flash('success')
//   res.locals.error = req.flash('error')
//   next()
// })

app.use('/', homeRoute)
app.use('/journals', journalsRoute)
app.use('/submit', submitArticleRoute)
app.use('/podcast', podcastRoute)
app.use('/admin', adminRoute)
app.use('/editor', editorRoute)

// Serve static assets (react) in production
if (process.env.NODE_ENV === 'prod') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// 404 page
app.get('*', (req, res) => {
  res.status(404).send('<h1>404 Page Not Found</h1>')
})

// catch all
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404))
})

// Error handler middleware
app.use(globalErrorHandler)

module.exports = app