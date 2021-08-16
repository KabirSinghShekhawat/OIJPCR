const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  profileCover: {
    type: String,
  },
  gender: {
    type: String,
    default: 'female',
  },
}, {
  timestamps: true,
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author