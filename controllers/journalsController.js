const slugify = require('slugify')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Journal = require('../models/journal')

const css = 'app.min.css'

exports.journals = catchAsync(async (request, response, next) => {
  const journals = await Journal
    .find({})
    .select('-content')
    .sort({ createdAt: -1 })
    .exec()
  response
})

exports.journalByVolume = catchAsync(async (request, response, next) => {
  const { volume } = request.params

  if (isNaN(parseInt(volume, 10))) {
    return next(new AppError('Volume is not a valid number', 400))
  }

  const journals = await Journal.find({ 'volume': volume }).sort({ createdAt: -1 })
  response.status(200).json(journals)
})

exports.getJournal = catchAsync(async (request, response, next) => {
  const { id } = request.params
  const journal = await Journal.findById(id)

  if (!journal) {
    return next(new AppError(`Found no journal with ID ${id}`, 404))
  }

  response.send(journal)
})
