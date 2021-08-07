const Journal = require('../models/journal')
const slugify = require('slugify')
const catchAsync = require('../utils/catchAsync')

const css = 'app.min.css'

exports.homepage = catchAsync(async (request, response, next) => {
  const journals = await Journal
    .find({})
    .sort({ createdAt: -1 })
    .limit(3)
  const options = {
    title: 'OIJPCR',
    css: css,
    isHomePage: true,
    journals: journals,
    slugify: slugify,
  }
  response.render('home', options)
})
