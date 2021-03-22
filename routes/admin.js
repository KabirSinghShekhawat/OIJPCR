const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Journal = require('../models/journal');
const Podcast = require('../models/podcast');

const css = 'admin.css'

const admin = async (request, response) => {
    const journals = await Journal.find({})
    const options = {
        title: 'Admin',
        css: css,
        journals: journals,
        isHomePage: false,
        slugify: slugify
    }
    response.render('admin/admin', options);
}


const addJournal = (request, response) => {
    const options = {
        title: 'Add New Journal',
        css: css,
        isHomePage: false,
    }
    response.render('admin/newJournal', options)
}

const postJournal = async (request, response) => {
    const { author, title, editordata, slug, volume } = request.body;
    console.log(`Author: ${author}\nTitle: ${title}\nSlug: ${slug}\nVolume: ${volume}`)
    const newJournal = {
        author: author,
        title: title,
        content: editordata,
        slug: slug,
        volume: volume
    }
    const journal = new Journal(newJournal);
    await journal.save();
    response.redirect('/admin');
}

const editJournal = async (request, response) => {
    const { id } = request.params;
    const journal = await Journal.findById(id);
    const options = {
        title: 'Edit Journal',
        css: css,
        isHomePage: false,
        journal: journal
    }
    response.render('admin/editJournal', options);
}

const putJournal = async (request, response) => {
    const { id } = request.params;
    const { author, title, editordata, slug, volume } = request.body;
    const updatedJournal = {
        author: author,
        title: title,
        content: editordata,
        slug: slug,
        volume: volume
    }
    await Journal.findByIdAndUpdate(id, updatedJournal);
    response.redirect('/admin');
}

const deleteJournal = async (request, response) => {
    const { id } = request.params;
    await Journal.findByIdAndDelete(id);
    response.redirect('/admin');
}
// Podcast
const podcastList = async (request, response) => {
    const podcasts = await Podcast.find({});
    const options = {
        title: 'Podcast',
        css: css,
        podcasts: podcasts,
        isHomePage: false
    }
    response.render('admin/podcastList', options);
}
const addPodcast = (request, response) => {
    const options = {
        title: 'Add new Podcast',
        css: css,
        isHomePage: false,
    }
    response.render('admin/newPodcast', options)
}

const postPodcast = async (request, response) => {
    const { author, title, description, episode, URL } = request.body;
    console.log(`Author: ${author}\nTitle: ${title}\nDescription: ${description}\nEpisode: ${episode}`)
    const newPodcast = {
        author: author,
        title: title,
        description: description,
        episode: episode,
        URL: URL
    }
    const podcast = new Podcast(newPodcast);
    await podcast.save();
    response.redirect('/admin/podcast/list');
}

const editPodcast = async (request, response) => {
    const { id } = request.params;
    const podcast = await Podcast.findById(id);
    const options = {
        title: 'Edit Podcast',
        css: css,
        isHomePage: false,
        podcast: podcast
    }
    response.render('admin/editPodcast', options);

}

const putPodcast = async (request, response) => {
    const { id } = request.params;
    const { author, title, description, episode, URL } = request.body;
    console.log(`Author: ${author}\nTitle: ${title}\nDescription: ${description}\nEpisode: ${episode}`)
    const updatedPodcast = {
        author: author,
        title: title,
        description: description,
        episode: episode,
        URL: URL
    }
    await Podcast.findByIdAndUpdate(id, updatedPodcast);
    response.redirect('/admin/podcast/list');

}

const deletePodcast = async (request, response) => {
    const {id} = request.params;
    await Podcast.findByIdAndDelete(id);
    response.redirect('/admin/podcast/list');
}

router.get('/', admin);
// Journals
router.get('/journal', addJournal);
router.get('/journal/:id', editJournal);
router.post('/journal', postJournal);
router.put('/journal/:id', putJournal);
router.delete('/journal/:id', deleteJournal);
// Podcasts
router.get('/podcast', addPodcast);
router.get('/podcast/list', podcastList);
router.get('/podcast/:id', editPodcast);
router.post('/podcast', postPodcast);
router.put('/podcast/:id', putPodcast);
router.delete('/podcast/:id', deletePodcast);

module.exports = router;