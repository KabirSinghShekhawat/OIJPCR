const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    journal_id: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
