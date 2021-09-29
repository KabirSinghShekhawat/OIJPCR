const multer = require('multer')
const multerS3 = require('multer-s3')
const createFileName = require('./utils/createFileName')
const { s3, s3bucket } = require('../../config/config')

const multerStorage = multerS3({
  s3: s3,
  bucket: s3bucket,
  acl: 'public-read',
  cacheControl: 'max-age=604800000', // cache for 1 week
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    const filename = createFileName(file.originalname, file.mimetype)
    cb(null, filename)
  },
})

// ** filter -> allow files with mimeType: image/* to pass through
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else cb(new Error('Not an Image'), false)
}

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('image')

module.exports = { multerUpload }