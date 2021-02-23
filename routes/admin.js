const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');


const admin = async (request, response) => {
    const journals = await Journal.find({})
    const options = {
        title: 'Admin',
        css: 'admin.css',
        journals: journals,
        isHomePage: false,
    }
    response.render('admin', options);
}



const postJournal = async (request, response) => {
    const { author, title, editordata } = request.body;
    console.log(request.body)
    const newJournal = {
        author: author,
        title: title,
        content: editordata
    }
    const journal = new Journal(newJournal);
    await journal.save();
    response.redirect('/admin');
}

const addJournal = (request, response) => {
    const options = {
        title: 'Add New Journal',
        css: 'admin.css',
        isHomePage: false,
    }
    response.render('newJournal', options)
}

const deleteJournal = async (request, response) => {
    const { id } = request.params;
    console.log("Made it!")
    await Journal.findByIdAndDelete(id);
    response.redirect('/admin');
}

const editJournal = async (request, response) => {
    const { id } = request.params;
    const journal = await Journal.findById(id);
    const options = {
        title: 'Edit Journal',
        css: 'admin.css',
        isHomePage: false,
        journal: journal
    }
    response.render('editJournal', options);
}

const putJournal = async (request, response) => {
    const { id } = request.params;
    const { author, title, editordata } = request.body;
    const updatedJournal = {
        author: author,
        title: title,
        content: editordata
    }
    await Journal.findByIdAndUpdate(id, updatedJournal);
    response.redirect('/admin');
}

router.get('/', admin);
router.get('/journal', addJournal);
router.get('/journal/:id', editJournal);
router.post('/journal', postJournal);
router.delete('/journal/:id', deleteJournal);
router.put('/journal/:id', putJournal);

module.exports = router;