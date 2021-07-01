const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    time: {
      type: String,
    },

    blocks: [
      {
        id: { type: String },
        type: { type: String },
        data: {
          text: { type: String },
          level: { type: Number },
        },
      }],

    version: { type: String },

    slug: {
      type: String,
      required: true,
    },

    volume: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal
