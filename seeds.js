const mongoose = require('mongoose');
const Comment = require('./models/comment');

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
        username: 'Blade', 
        comment: 'i hate vampires'
    },
    {
        username: 'Elon',
        comment: 'Attack on Titan is the best show on this planet.'
    },
    {
        username: 'Ariana Grande',
        comment: 'Yuh-Yuh'
    }
];

Comment.insertMany(seed)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})