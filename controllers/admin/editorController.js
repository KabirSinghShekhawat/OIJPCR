const fs = require('fs/promises')
const path = require('path')
const Journal = require('../../models/journal')
const {multerStorage, multerFilter} = require('../ImageUpload/ArticleCoverImage')
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
const multer = require('multer')


const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})


exports.uploadImage = upload.single('image')

// ! testing only
// TODO: Remove later
exports.getJournals = catchAsync(async (req, res, next) => {
  const journals = await Journal.find()
  res.json(journals)
})

// ! change buffer type
exports.getImageFile = catchAsync(async (req, res, next) => {
  const { name } = req.params
  // * calculate path of image in ./public/img
  const imagePath = path.dirname(require.main.filename) + '/public/img/' + name
  const imageSource = path.join(imagePath)
  //  * read image
  const data = await fs.readFile(imageSource)
  if(!data) return next(new AppError('Could not load image', 400))
  // * send image using correct headers
  res.writeHead(200, { 'Content-Type': 'image/jpeg' })
  res.end(data)
})


// * return image URL to client, also available in MongoDB.
exports.uploadImageFile = (req, res) => {
  res.send({
    success: 1,
    file: {
      // * path is relative, no need to change for deployment
      // ** ex: http://localhost:<PORT>/editor/images/<IMAGE_NAME>
      url: '/editor/images/' + req.file.filename,
    },
  })
}

exports.saveArticle = catchAsync(async (req, res, next) => {
  const { author, title, content, slug, volume, cover } = req.body
  const newArticle = new Journal({
    author,
    title,
    content,
    slug,
    volume,
    cover,
  })

  const result = await newArticle.save()

  if (!result)
    return next(new AppError('Could not create Article', 400))

  res.status(201).send({ status: 'success' })
})

exports.editArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { author, title, content, slug, volume, cover } = req.body
  const modifiedArticle = {
    author,
    title,
    content,
    slug,
    volume,
    cover,
  }

  const result = await Journal.findByIdAndUpdate(id, { ...modifiedArticle })

  if (!result)
    return next(new AppError('Could not update Article', 400))

  res.status(201).send({ status: 'success' })
})

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const { id, imageName } = req.params
  // * deleting the default image is not a good idea.
  // * all articles use this image as default
  if (!isDefaultImage(imageName)) {
    await deleteCoverImage(imageName, next)
  }
  // * After deleting the cover image, article can be safely deleted.
  const result = await Journal.findByIdAndDelete(id)

  if (!result)
    return next(new AppError('Could not delete Article', 400))

  res.status(201).send({ status: 'success' })
})

exports.deleteImage = catchAsync(async (req, res, next) => {
  const { imageName } = req.params

  await deleteCoverImage(imageName, next)

  res.status(204).send({ status: 'success' })
})

const deleteCoverImage = catchAsync(async (imageName, next) => {
  const imagePath = path.join(
    path.dirname(require.main.filename) +
    '/public/img/' +
    imageName,
  )

  await fs.unlink(imagePath)
    .catch(err => {
      return next(new AppError('Could not delete image: ' + imageName, 404))
    })
})

function isDefaultImage (imageName) {
  return imageName === 'r2_c1.jpg'
}

