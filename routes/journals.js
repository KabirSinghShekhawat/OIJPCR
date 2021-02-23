const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');


const journals = async (request, response) => {
    const journals = await Journal.find({});
    const options = {
        title: 'Journals',
        css: 'app.css',
        isHomePage: false,
        journals: journals
    }
    response.render('journals', options);
}

const getJournal = async (request, response) => {
    const { id } = request.params;
    const journal = await Journal.findById(id);
    const options = {
        title: 'Journal',
        css: 'app.css',
        isHomePage: false,
        journal: journal
    }
    response.render('readJournal', options);
}

const postComment = (request, response) => {
    console.log(request.body)
    response.redirect('/journals');
}

router.get('/', journals);
router.get('/:id', getJournal);
router.post('/:id', postComment);

module.exports = router;