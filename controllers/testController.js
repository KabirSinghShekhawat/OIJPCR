const Journal = require('../models/journal')

const fs = require('fs/promises')
const path = require('path')

exports.getJournals = async (req, res) => {
  const journals = await Journal.find()
  res.send(journals)
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

exports.getImageFile = async (req, res) => {
  const { name } = req.params
  const src = path.join(
    path.dirname(require.main.filename) + '/uploads/' + name)
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
  const a = req.file
  console.log(a)
  res.send({
    'success': 1,
    'file': {
      'url': '/test/' + req.file.path,
    },
  })
}

// TODO: remove api route
exports.apiData = async (request, response) => {
  if (process.env.NODE_ENV !== 'dev') {
    console.log('access API data in production')
    response.redirect('/')
  } else {
    const journals = await Journal.find({})
    response.send(journals)
  }
}