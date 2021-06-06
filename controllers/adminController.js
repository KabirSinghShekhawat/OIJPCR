const slugify = require('slugify');
const Journal = require('../models/journal');
const Podcast = require('../models/podcast');
const Comment = require('../models/comment');
const dateFormat = require('../public/js/dateFormat');

const css = 'admin.css'

exports.admin = async (request, response) => {
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


exports.addJournal = (request, response) => {
    const options = {
        title: 'Add New Journal',
        css: css,
        isHomePage: false,
    }
    response.render('admin/newJournal', options)
}

exports.postJournal = async (request, response) => {
    const { author, title, editordata, slug, volume } = request.body;
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

exports.editJournal = async (request, response) => {
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

exports.putJournal = async (request, response) => {
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

exports.deleteJournal = async (request, response) => {
    const { id } = request.params;
    await Journal.findByIdAndDelete(id);
    response.redirect('/admin');
}
// Podcast
exports.podcastList = async (request, response) => {
    const podcasts = await Podcast.find({});
    const options = {
        title: 'Podcast',
        css: css,
        podcasts: podcasts,
        isHomePage: false
    }
    response.render('admin/podcastList', options);
}
exports.addPodcast = (request, response) => {
    const options = {
        title: 'Add new Podcast',
        css: css,
        isHomePage: false,
    }
    response.render('admin/newPodcast', options)
}

exports.postPodcast = async (request, response) => {
    const { author, title, description, episode, URL } = request.body;
    // console.log(`Author: ${author}\nTitle: ${title}\nDescription: ${description}\nEpisode: ${episode}`)
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

exports.editPodcast = async (request, response) => {
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

exports.putPodcast = async (request, response) => {
    const { id } = request.params;
    const { author, title, description, episode, URL } = request.body;
    // console.log(`Author: ${author}\nTitle: ${title}\nDescription: ${description}\nEpisode: ${episode}`)
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

exports.deletePodcast = async (request, response) => {
    const {id} = request.params;
    await Podcast.findByIdAndDelete(id);
    response.redirect('/admin/podcast/list');
}
/**
 * Comments
 */

exports.commentsPage = async (req, res) => {
    try {
        const comments = await Comment.find({}).sort({createdAt: -1});
        const options = {
            title: 'Comments',
            css: css,
            comments: comments,
            dateFormat: dateFormat
        }
        res.render('admin/comments', options)
    } catch (err) {
        req.flash('error', 'An error occurred')
        return res.redirect('/admin')
    }
}

exports.publishComment = async (req, res) => {
    try {
        await modifyComment(req, true, 'Comment has been published')
        console.log('Publish Comment')
        return res.redirect('/admin/comments')
    } catch (err) {
        console.log(err)
        req.flash('error', 'Could Not Publish Comment')
        return res.redirect('/admin/comments')
    }
}

exports.draftComment = async (req, res) => {
    try {
        await modifyComment(req, false, 'Comment Moved to Draft')
        return res.redirect('/admin/comments')
    } catch (err) {
        console.log(err)
        req.flash('error', 'Could Not Draft Comment')
        return res.redirect('/admin/comments')
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const {id} = req.params
        await Comment.findByIdAndDelete(id)
        req.flash('success', 'Comment deleted successfully')
        return res.redirect('/admin/comments')
    } catch (err) {
        console.log(err)
        req.flash('error', 'Could Not Delete Comment')
        return res.redirect('/admin/comments')
    }
}

const modifyComment = async (req, action, message) => {
    const { id } = req.params;
    try {
        await Comment.findByIdAndUpdate(id, { isVerified: action})
        return req.flash('success', message)
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}
