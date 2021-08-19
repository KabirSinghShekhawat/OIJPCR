const createFileName = require('./utils/createFileName')
//* multer set-up
const multer = require('multer')
// ! const upload = multer({ dest: 'public/img/articles/uploads/' })
// ** storage engine
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img')
  },
  filename: (req, file, cb) => {
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

module.exports = {multerStorage, multerFilter}