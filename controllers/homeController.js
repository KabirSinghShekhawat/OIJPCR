const fs = require('fs/promises');
const path = require('path');

exports.getImageFile = async (req, res) => {
    const { name } = req.params;
    const src = path.join(path.dirname(require.main.filename) + '/uploads/' + name );
    const data = await fs.readFile(src, "binary");
    res.send( new Buffer.from(data, 'binary'))
}

exports.uploadByUrl = (req, res) => {
    res.send({
        "success": 1,
        "file": {
            "url": ''
        }
    })
}

exports.uploadImageFile = (req, res) => {
    const a = req.file;
    console.log(a)
    res.send({
        "success": 1,
        "file": {
            "url": req.file.path
        }
    })
}

const Journal = require('../models/journal');
const slugify = require('slugify');

const css = 'app.min.css'

exports.apiData = async (request, response) => {
    if (process.env.NODE_ENV !== 'dev') {
        console.log('access API data in production')
        response.redirect('/')
    } else {
        const journals = await Journal.find({})
        response.send(journals)
    }
}

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
