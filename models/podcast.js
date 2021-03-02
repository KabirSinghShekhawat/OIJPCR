const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    episode: {
        type: Number
    },
    URL: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
