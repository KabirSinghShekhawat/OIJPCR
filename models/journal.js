const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
      default: 'Anonymous',
    },

    title: {
      type: String,
      required: true,
      default: 'Title NA',
    },

    content: {
      type: String,
      required: true,
      default: 'Content NA',
    },

    slug: {
      type: String,
      required: true,
      default: 'Slug NA',
    },

    volume: {
      type: Number,
      default: 1,
    },
    tags: {
      type: String,
      default: ',',
    },
    cover: {
      type: String,
      default: 'http://localhost:5000/editor/images/r2_c1.jpg',
    },
  },
  {
    timestamps: true,
  },
)

journalSchema.index({tags: 'text'})

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal
