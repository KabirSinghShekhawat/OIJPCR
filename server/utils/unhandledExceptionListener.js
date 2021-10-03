function unhandledExceptionListener(msg, err, server=null) {
  console.log(`${msg} 💥 shutting down.`)
  console.log(err.name, err.message)

  if (!server) {
    process.exit(1)
  }

  server.close(() => {
    process.exit(1)
  })
}

module.exports = unhandledExceptionListener