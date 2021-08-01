const Journal = require('../models/journal')
const fs = require('fs/promises')
const path = require('path')

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

function createFileName (originalName, mimeType) {
  let fileExtension = mimeType.split('/')[1]
  let splitString = fileExtension
  // ** mime-type for both .jpg and .jpeg is jpeg
  // ** but splitter must be different based on fileName. 
  if (fileExtension === 'jpeg') splitString = '.jpg'
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
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadImage = upload.single('image')

// ! testing only
// TODO: Remove later
exports.getJournals = async (req, res) => {
  const journals = await Journal.find()
  res.json(journals)
}

// ! change buffer type
exports.getImageFile = async (req, res) => {
  const { name } = req.params
  const src = path.join(path.dirname(require.main.filename) + '/public/img/' + name)
  console.log(src)
  const data = await fs.readFile(src)
  res.writeHead(200, {'Content-Type': 'image/jpeg'});
  res.end(data);
  // res.send(new Buffer.from(data, 'binary'))
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
    success: 1,
    file: {
      url: '/editor/images/' + req.file.filename,
    },
  })
}

exports.saveArticle = async (req, res) => {
  const { author, title, content, slug, volume, cover } = req.body
  const newArticle = new Journal({
    author,
    title,
    content,
    slug,
    volume,
    cover
  })
  await newArticle.save()
  res.status(201).send({ status: 'OK' })
}

exports.editArticle = async (req, res) => {
  const { id } = req.params
  const { author, title, content, slug, volume, cover } = req.body
  const modifiedArticle = {
    author,
    title,
    content,
    slug,
    volume,
    cover
  }
  await Journal.findByIdAndUpdate(id, { ...modifiedArticle })
  res.status(201).send({ status: 'OK' })
}

exports.deleteArticle = async (req, res) => {
  const { id } = req.params
  await Journal.findByIdAndDelete(id)
  res.status(201).send({ status: 'OK' })
}