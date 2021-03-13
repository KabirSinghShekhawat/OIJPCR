const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Journal = require('../models/journal');
const Comment = require('../models/comment');

const journals = async (request, response) => {
    const journals = await Journal.find({});
    const options = {
        title: 'Journals',
        css: 'app.css',
        isHomePage: false,
        journals: journals,
        slugify: slugify
    }
    response.render('journals', options);
}

const journalByVolume = async (request, response) => {
    const { volume } = request.params;
    const journals = await Journal.find({'volume': volume});
    const options = {
        title: 'Journals',
        css: 'app.css',
        isHomePage: false,
        journals: journals,
        slugify: slugify
    }
    response.render('journals', options);
}

const getJournal = async (request, response) => {
    const { id } = request.params;
    const journal = await Journal.findById(id);
    const comments = await Comment.find({'journal_id': id});
    const options = {
        title: 'Journal',
        css: 'app.css',
        isHomePage: false,
        journal: journal,
        comments: comments
    }
    response.render('readJournal', options);
}

const postComment = async (request, response) => {
    const { slug, id } = request.params;
    const { name, email, comment: commentText } = request.body
    const newComment = {
        username: name,
        email: email,
        comment: commentText,
        journal_id: id
    }
    const comment = new Comment(newComment);
    await comment.save();
    response.redirect(`/journals/${slug}/${id}`);
}

router.get('/', journals);
router.get('/:volume', journalByVolume);
router.get('/:slug/:id', getJournal);
router.post('/:slug/:id', postComment);

module.exports = router;