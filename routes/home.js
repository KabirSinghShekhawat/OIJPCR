const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

const css = 'app.min.css'

const apiData = async (request, response) => {
    if(process.env.NODE_ENV !== 'dev') {
        await console.log('access API data in production')
        response.redirect('/')
    } else {
        const journals = await Journal.find({})
        response.send(journals)
    }
}

const homepage = (request, response) => {
    const options = {
        title: 'OIJPCR',
        css: css,
        isHomePage: true
    }
    response.render('home', options);
}

router.get('/', homepage);
router.get('/api', apiData);

module.exports = router;