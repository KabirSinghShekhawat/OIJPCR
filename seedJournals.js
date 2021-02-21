const mongoose = require('mongoose');
const Journal = require('./models/journal');

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect('mongodb://localhost/oijpcr', mongoOptions)
.then(() => {
    console.log("Connected to MongoDB oijpcr");
})
.catch(err => {
    console.log("Error agaya yaar!")
    console.log(err)
})

const seed = [
    {
        author: 'Blade', 
        content: 'Blade is a 1998 American superhero horror film directed by Stephen Norrington and written by David S. Goyer. Based on the Marvel Comics superhero of the same name, it is the first installment of the Blade film series.'
    },
    {
        author: 'Eren Yeager',
        content: 'When man-eating Titans first appeared 100 years ago, humans found safety behind massive walls that stopped the giants in their tracks. But the safety they have had for so long is threatened when a colossal Titan smashes' +
        'through the barriers, causing a flood of the giants into what had been the humans safe zone. During the carnage that follows, soldier Eren Jaeger sees one of the creatures devour his mother, which leads him to vow that he will kill' + 
        'every Titan. He enlists some friends who survived to help him, and that group is humanity last hope for avoiding extinction at the hands of the monsters.'
    },
    {
        author: 'Ariana Grande',
        content: 'I hate America.'
    }
];

Journal.insertMany(seed)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})