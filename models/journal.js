const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
      default: "Anonymous"
    },

    title: {
      type: String,
      required: true,
      default: "Title NA"
    },

    editorJSObject: {
      type: Object
    },

    slug: {
      type: String,
      required: true,
      default: "Slug NA"
    },

    volume: {
      type: Number,
      default: 1
    },
  },
  {
    timestamps: true,
  },
)

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal
