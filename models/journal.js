const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    volume: {
        type: Number
    }
},
    {
        timestamps: true
    }
);

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
