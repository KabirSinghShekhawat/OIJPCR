const Journal = require('../models/journal');
const slugify = require('slugify');

const css = 'app.min.css'

exports.homepage = async (request, response) => {
    try {
        const journals = await Journal
            .find({})
            .sort({createdAt: -1})
            .limit(3)
        const options = {
            title: 'OIJPCR',
            css: css,
            isHomePage: true,
            journals: journals,
            slugify: slugify
        }
        response.render('home', options);
    } catch (err) {
        response.status(404).send('Journals not found');
    }
}
