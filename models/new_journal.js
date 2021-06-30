const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
  },
})

const blockSchema = mongoose.Schema({
  dataSchema: { dataSchema },
  blockId: { type: String },
  blockType: { type: String },
})

const newJournalSchema = mongoose.Schema({
  blocks: [{ blockSchema }],
  time: {
    type: String,
  },
  version: {
    type: String,
  },
})

const newJournal = mongoose.model('newJournal', newJournalSchema)

module.exports = newJournal
