const mongoose = require('mongoose')
require('dotenv').config()

const journalSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
      default: 'Anonymous',
    },

    authorPhoto: {
      type: String,
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
      default: `${process.env.HOST}editor/images/article_cover_fallback.jpg`,
    },
  },
  {
    timestamps: true,
  },
)

journalSchema.index({ tags: 'text' })

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal
