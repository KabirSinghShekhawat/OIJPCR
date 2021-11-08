const express = require('express')
const app = express().disable('x-powered-by')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const method_override = require('method-override')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
// Routes
const journalsRoute = require('./routes/journals')
const adminRoute = require('./routes/admin')
const editorRoute = require('./routes/editor')
const volumeRoute = require('./routes/volume')
const unhandledExceptionListener = require('./utils/unhandledExceptionListener')
require('dotenv').config({path: path.join(__dirname, '/.env')});

process.on('uncaughtException', err => {
  unhandledExceptionListener('UNHANDLED EXCEPTION', err)
})

/*-----------Global Middlewares------------*/

// Helmet

const corsOrigin = 'https://oijpcr.org'

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
)

// CORS
app.use(cors({
  credentials: true,
  origin: corsOrigin
}))

// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: 'Too many requests, try again later',
})

app.use('*', limiter)

// Method Override
app.use(method_override('_method'))

// cookie parser
app.use(cookieParser())

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


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', corsOrigin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-PINGOTHER,Content-Type, Accept, Authorization'
  );
  next();
});


app.use('/journals', journalsRoute)
app.use('/admin', adminRoute)
app.use('/volume', volumeRoute)
app.use('/editor', editorRoute)

// Serve static assets (react) in production
if (process.env.NODE_ENV === 'prod') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    )
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
