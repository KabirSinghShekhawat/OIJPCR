const multer = require('multer')
const Author = require('../../models/author')
const { deleteCoverImage } = require('./utils')
const { multerStorage, multerFilter } = require('../ImageUpload/ArticleCoverImage')
const { getImageFile, uploadImageFile } = require('./editorController')
const AppError = require('../../utils/appError')
const catchAsync = require('../../utils/catchAsync')

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadImage = upload.single('image')

// ! change buffer type
exports.getImageFile = getImageFile

// * return image URL to client, also available in MongoDB.
exports.uploadImageFile = uploadImageFile

exports.getAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const author = await Author.findById(id);

  if (!author)
    return next(new AppError('Could not find Author', 400))

  res.status(201).json(author)
})

exports.saveAuthor = catchAsync(async (req, res, next) => {
  const { name, profileCover, gender } = req.body
  const newAuthor = new Author({
    name, profileCover, gender,
  })

  const result = await newAuthor.save()

  if (!result)
    return next(new AppError('Could not create Author: ' + name, 400))

  res.status(201).send({ status: 'success' })
})

exports.editAuthorProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { name, profileCover, gender } = req.body

  const modifiedAuthor = {
    name, profileCover, gender
  }

  const result = await Author.findByIdAndUpdate(id, { ...modifiedAuthor })

  if (!result)
    return next(new AppError('Could not update profile: ' + name, 400))

  res.status(201).send({ status: 'success' })
})

exports.deleteAuthorProfile = catchAsync(async (req, res, next) => {
  const { id, imageName } = req.params
  // * deleting the default image is not possible since it's an asset.
  if (imageName !== 'male_avatar' && imageName !== 'female_avatar' ) {
    await deleteCoverImage(imageName, next)
  }
  // * After deleting the cover image, author profile can be safely deleted.
  const result = await Author.findByIdAndDelete(id)

  if (!result)
    return next(new AppError('Could not delete author profile', 400))

  res.status(201).send({ status: 'success' })
})

exports.deleteImage = catchAsync(async (req, res, next) => {
  const { imageName } = req.params

  if (imageName !== 'male_avatar' && imageName !== 'female_avatar' ) {
    await deleteCoverImage(imageName, next)
  }

  res.status(204).send({ status: 'success' })
})
