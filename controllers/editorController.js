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
  // * calculate path of image in ./public/img
  const imagePath = path.dirname(require.main.filename) + '/public/img/' + name
  const imageSource = path.join(imagePath)
  //  * read image
  try {
    const data = await fs.readFile(imageSource)
    res.writeHead(200, { 'Content-Type': 'image/jpeg' })
    res.end(data)
  } catch (err) {
    console.log(err)
    res.status(404).send('Image not found')
  }
  // * send image using correct headers

}

// TODO: Implement later
// TODO: image upload from URL is not required for now.
// exports.uploadByUrl = (req, res) => {
//   res.send({
//     success: 1,
//     file: {
//       url: '',
//     },
//   })
// }

// * return image URL to client, saved in MongoDB.
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

exports.saveArticle = async (req, res) => {
  const { author, title, content, slug, volume, cover } = req.body
  const newArticle = new Journal({
    author,
    title,
    content,
    slug,
    volume,
    cover,
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
    cover,
  }
  await Journal.findByIdAndUpdate(id, { ...modifiedArticle })
  res.status(201).send({ status: 'OK' })
}

exports.deleteArticle = async (req, res) => {
  try {
    const { id, imageName } = req.params
    // * deleting the default image is not a good idea.
    // * all articles use this image as default
    if (!isDefaultImage(imageName)) {
      try {
        await deleteCoverImage(imageName)
      } catch (e) {
        console.log(e)
      }
    }
    // * After deleting the cover image, article can be safely deleted.
    await Journal.findByIdAndDelete(id)
    res.status(201).send({ status: 'OK' })

  } catch (err) {
    res.status(404).send({ msg: 'Article not found' })
    throw new Error(err.message)
  }
}

exports.deleteImage = async (req, res) => {
  const { imageName } = req.params
  try {
    await deleteCoverImage(imageName)
    res.status(204).send({ status: 'OK' })
  } catch (err) {
    res.status(404).send({ msg: 'Could not delete Image' })
  }
}

async function deleteCoverImage (imageName) {
  const imagePath = path.join(
    path.dirname(require.main.filename) +
    '/public/img/' +
    imageName,
  )

  await fs.unlink(imagePath)
    .catch(err => {
      throw new Error('Could not delete image: ' + imageName)
    })
}

function isDefaultImage (imageName) {
  return imageName === 'r2_c1.jpg'
}