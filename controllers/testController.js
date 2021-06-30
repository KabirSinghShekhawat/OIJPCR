const Journal = require('../models/journal')
const newJournal = require('../models/new_journal')

const fs = require('fs/promises')
const path = require('path')

exports.getJournals  = async (req, res) => {
  const journals = await newJournal.find().populate({path: "blocks.blockSchema.dataSchema"});
  res.send(journals)
}

exports.saveArticle  = async (req, res) => {
  const { blocks, time, version } = req.body
  const formattedBlocks = formatBlocks(blocks)
  const newArticle = new newJournal({
    blocks: formattedBlocks,
    time,
    version
  })
  await newArticle.save()
  res.status(201).send({status: "OK", created: newArticle})
}

function formatBlocks (blocks) {
  let newBlocks = []
  for (let block of blocks) {
    const dataSchema = {
      text: block.data.text,
      level: block.data.level ? block.data.level : 0,
    }
    const blockSchema = {
      dataSchema,
      blockId: block.id,
      blockType: block.type,
    }
    const newBlock = {
      blockSchema,
    }
    newBlocks.push(newBlock)
  }
  return newBlocks
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