const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
const Volume = require('../../models/volume')


exports.volumes = catchAsync(async (req, res, next) => {
  const volumes = await Volume.find({}).sort({ volume: 1 })
  res.status(200).json(volumes)
})


exports.getVolume = catchAsync(async (req, res, next) => {
  const { volume } = req.params

  if (isNaN(parseInt(volume, 10))) {
    return next(new AppError('Volume is not a valid number', 400))
  }

  const result = await Volume.find({ 'volume': volume })
  res.status(200).json(result)
})

exports.createVolume = catchAsync(async (req, res, next) => {
  const { volume, about, cover, date } = req.body
  const newVolume = new Volume({
    volume, about, cover, date,
  })

  const result = await newVolume.save()

  if (!result)
    return next(new AppError('Could not create volume ' + volume, 400))

  res.status(201).send({ status: 'success' })
})


exports.editVolume = catchAsync(async (req, res, next) => {
  const { volume, about, cover, date } = req.body

  const filter = { volume: volume}
  const update = {
    volume, about, cover, date,
  }

  const result = await Volume.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })

  if (!result)
    return next(new AppError('Could not edit volume ' + volume, 400))

  res.status(201).send({ status: 'success' })
})

exports.deleteVolume = catchAsync(async (req, res, next) => {
  const { volume } = req.params

  if (isNaN(parseInt(volume, 10))) {
    return next(new AppError('Volume is not a valid number', 400))
  }

  const result = await Volume.deleteOne({ 'volume': volume })

  if (!result)
    return next(new AppError('Could not delete Volume', 400))

  res.status(201).send({ status: 'success' })

})