const fs = require('fs/promises')
const path = require('path')
const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
const { s3, s3bucket } = require('../../config/config')

const deleteCoverImage = catchAsync(async (imageName, next) => {
  const keyName = decodeURI(imageName)
  const params = {
    Bucket: s3bucket,
    Key: keyName
  };

  s3.deleteObject(params, (error, data) => {
    if (error) {
      console.log(error)
      return next(new AppError('Could not delete image: ' + imageName, 404))
    }
    console.log(data)
  });
})

function isDefaultImage (imageName) {
  return imageName === 'article_cover_fallback.jpg'
}

module.exports = {isDefaultImage, deleteCoverImage}