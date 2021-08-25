const mongoose = require('mongoose')
require('dotenv').config()

const volumeSchema = new mongoose.Schema({
    volume: {
      type: Number,
      unique: true,
      required: true,
    },

    about: {
      type: String,
      // required: true,
      default: "Explore this volume"
    },

    cover: {
      type: String,
      default: `${process.env.HOST}editor/images/volume_cover_fallback.jpeg`
    },

    date: {
      type: String,
      default: 'January 2021'
    }
  },
  {
    timestamps: true,
  },
)

const Volume = mongoose.model('Volume', volumeSchema)

module.exports = Volume
