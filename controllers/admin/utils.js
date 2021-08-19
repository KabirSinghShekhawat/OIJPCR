const fs = require('fs/promises')
const path = require('path')
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')

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
  return imageName === 'article_cover_fallback.jpg'
}

module.exports = {isDefaultImage, deleteCoverImage}