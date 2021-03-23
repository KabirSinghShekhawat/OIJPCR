const express = require('express');
const router = express.Router();

const css = 'app.min.css'

const submitArticle = (request, response) => {
    const options = {
        title: 'Submit Articles',
        css: css,
        isHomePage: false
    }
    response.render('submit', options);
}

const postArticle = (request, response) => {
    /**
     * TODO: Contact Us
     */
    response.redirect('/');
}

router.route('/')
.get(submitArticle)
.post(postArticle);

module.exports = router;