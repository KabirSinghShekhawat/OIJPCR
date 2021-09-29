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

exports.journalsByLimit = catchAsync(async (request, response, next) => {
  const {limit} = request.params

  if (isNaN(parseInt(limit, 10))) {
    return next(new AppError('limit is not a valid number', 400))
  }

  const journals = await getJournals(parseInt(limit, 10))
  response.status(200).json(journals)
})

exports.journalsByVolume = catchAsync(async (request, response, next) => {
  const { volume, full } = request.params

  if (isNaN(parseInt(volume, 10))) {
    return next(new AppError('Volume is not a valid number', 400))
  }

  let fieldsToRemove = '-content'
  if (full === 'full') {
    fieldsToRemove = ''
  }

  const journals = await Journal
    .find({ 'volume': volume })
    .select(fieldsToRemove)
    .sort({ createdAt: -1 })
  response.status(200).json(journals)
})

exports.getLimitedJournalsByVolume = catchAsync(async (request, response, next) => {
  const { volume, limit } = request.params

  const volumeInt = parseInt(volume, 10)
  if (isNaN(volumeInt) || volumeInt < 1) {
    return next(new AppError('Volume is not a valid value', 400))
  }

  const numberOfArticles = parseInt(limit, 10)
  if (isNaN(numberOfArticles) || numberOfArticles < 1) {
    return next(new AppError('Limit is not a valid value', 400))
  }

  const journals = await Journal
    .find({ 'volume': volume })
    .select('-content')
    .sort({ createdAt: -1 })
    .limit(numberOfArticles)
  response.status(200).json(journals)
})

exports.getJournal = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const journal = await Journal.findById(id)
  console.log("Id")
  console.log(id)
  if (!journal) {
    return next(new AppError(`Found no journal with ID ${id}`, 404))
  }

  res.status(200).json(journal)
})

exports.archive = catchAsync(async (req, res, next) => {
  const archives = await Volume.find({}).sort({ volume: 1 })
  res.status(200).json(archives)
})

exports.journalsByTag = catchAsync(async (req, res, next) => {
  const {tag} = req.params

  if (typeof tag !== 'string' || tag.length < 1) {
    return next(new AppError(`Invalid tag: ${tag}`, 404))
  }
  
  const articles = await Journal.find(
    {
      $text:
        {
          $search: tag,
        },
    }).select('-content')
  res.status(200).json(articles)
})

exports.tags = catchAsync(async (req, res, next) => {
  let tags = await Journal.distinct("tags")
  // tags = ["tag1, tag2, tag3", "tag4, tag5"]
  tags = tags.map(tag => tag.split(', '))
  // tags is a 2D array
  // tags = [["tag1", "tag2", "tag3"], ["tag4, tag5"]]
  // alternate solution - tags = tags.flat(1) ES2019 syntax
  tags = [].concat.apply([], tags)

  const max = 9
  const end = tags.length < max ? tags.length : max
  tags = tags.slice(0, end)
  res.status(200).json(tags)
})

async function getJournals(limit) {
  return await Journal
    .find({})
    .select('-content -authorPhoto')
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec()
}