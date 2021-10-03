const express = require('express');
const router = express.Router();
const Podcast = require('../models/podcast');

const css = 'app.min.css'

const podcast = async (request, response) => {
    const podcasts = await Podcast.find({});
    const options = {
        title: 'Podcast',
        css: css,
        podcasts: podcasts,
        isHomePage: false
    }
    response.render('podcast', options);
}

router.get('/', podcast);

module.exports = router;