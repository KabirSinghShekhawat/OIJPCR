const mongoose = require('mongoose')

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
      default: 'http://localhost:5000/editor/images/r2_c1.jpg'
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
