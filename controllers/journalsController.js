const slugify = require('slugify');
const dateFormat = require('../public/js/dateFormat');
const Journal = require('../models/journal');
const Comment = require('../models/comment');

const css = 'app.min.css'

exports.journals = async (request, response) => {
    const journals = await Journal.find({});
    const options = {
        title: 'Journals',
        css: css,
        isHomePage: false,
        journals: journals,
        slugify: slugify
    }
    response.render('journals', options);
}

exports.journalByVolume = async (request, response) => {
    const { volume } = request.params;
    const journals = await Journal.find({'volume': volume});
    const options = {
        title: 'Journals',
        css: css,
        isHomePage: false,
        journals: journals,
        slugify: slugify
    }
    response.render('journals', options);
}

exports.getJournal = async (request, response) => {
    const { id } = request.params;
    const journal = await Journal.findById(id);
    const comments = await Comment.find({'journal_id': id});
    const options = {
        title: 'Journal',
        css: css,
        isHomePage: false,
        journal: journal,
        comments: comments, 
        dateFormat: dateFormat
    }
    
    response.render('readJournal', options);
}

exports.postComment = async (request, response) => {
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