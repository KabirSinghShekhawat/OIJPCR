const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
