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
    console.log(request.body) 
    response.redirect('/');
}

router.get('/', submitArticle);
router.post('/', postArticle);

module.exports = router;