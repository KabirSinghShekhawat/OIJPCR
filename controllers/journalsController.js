const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Journal = require('../models/journal')
const Volume = require('../models/volume')

exports.journals = catchAsync(async (request, response, next) => {
  const journals = await Journal
    .find({})
    .select('-content')
    .sort({ createdAt: -1 })
    .exec()
  response.status(200).json(journals)
})

exports.journalByVolume = catchAsync(async (request, response, next) => {
  const { volume } = request.params

  if (isNaN(parseInt(volume, 10))) {
    return next(new AppError('Volume is not a valid number', 400))
  }

  const journals = await Journal.find({ 'volume': volume }).sort({ createdAt: -1 })
  response.status(200).json(journals)
})

exports.getJournal = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const journal = await Journal.findById(id)

  if (!journal) {
    return next(new AppError(`Found no journal with ID ${id}`, 404))
  }

  res.status(200).json(journal)
})


exports.archive = catchAsync(async (req, res, next) => {
  const archives = await Volume.find({}).sort({ volume: 1 })
  res.status(200).json(archives)
})


