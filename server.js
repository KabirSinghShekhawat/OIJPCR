const app = require('./app');
const unhandledExceptionListener = require('./utils/unhandledExceptionListener')

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT} 🏤`);
})

process.on('unhandledRejection', err => {
    unhandledExceptionListener('UNHANDLED PROMISE REJECTION', err, server)
})

