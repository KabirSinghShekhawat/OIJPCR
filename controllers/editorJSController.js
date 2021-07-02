const Journal = require('../models/journal')

const fs = require('fs/promises')
const path = require('path')

//* multer set-up
const multer = require('multer')
// ! const upload = multer({ dest: 'public/img/articles/uploads/' })
// ** storage engine
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/articles/uploads')
  },
  filename: (req, file, cb) => {
    const filename = createFileName(file.originalname, file.mimetype)
    cb(null, filename)
  }
})

function createFileName(originalName, mimeType) {
  let fileExtension = mimeType.split('/')[1]
  let splitString = fileExtension
  // ** mime-type for both .jpg and .jpeg is jpeg
  // ** but splitter must be different based on fileName. 
  if(fileExtension === 'jpeg') splitString = '.jpg'
  else splitString = '.' + splitString

  const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E6)
  const prefix = originalName.split(splitString)[0]

  return (`${prefix}_${uniqueSuffix}.${fileExtension}`)
}

// ** filter -> allow files with mimeType: image/* to pass through
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else cb(new Error('Not an Image'), false)
}

const upload = multer({ 
  storage: multerStorage ,
  fileFilter: multerFilter
})

exports.uploadImage = upload.single('image');

// ! testing only
// TODO: Remove later
exports.getJournals = async (req, res) => {
  const journals = await Journal.find()
  res.send(journals)
}


// ! change buffer type
exports.getImageFile = async (req, res) => {
  const { name } = req.params
  const src = path.join(path.dirname(require.main.filename) + '/public/img/articles/uploads/' + name)
  console.log(src)
  const data = await fs.readFile(src, 'binary')
  res.send(new Buffer.from(data, 'binary'))
}

exports.uploadByUrl = (req, res) => {
  res.send({
    'success': 1,
    'file': {
      'url': '',
    },
  })
}

exports.uploadImageFile = (req, res) => {
  const file = req.file
  console.log(file)

  res.send({
    'success': 1,
    'file': {
      'url': '/editor/images/' + req.file.filename,
    },
  })
}

exports.saveArticle = async (req, res) => {
  const { author, title, blocks, time, version, slug, volume } = req.body
  const newArticle = new Journal({
    author,
    title,
    time,
    blocks,
    version,
    slug,
    volume
  })
  await newArticle.save()
  res.status(201).send({ status: 'OK', created: newArticle })
}