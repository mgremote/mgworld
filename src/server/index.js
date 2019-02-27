const port = process.env.PORT || 3006
if (!process.env.LOG) {
  process.env.LOG = 'api:info'
}

const app = require('./app')
const { log } = require('./log')

const server = app.listen(port, () => {
  log.info('Listening on %s', port)
})

function shutdown () {
  log.warn('Received shutdown signal, killing server.')
  server.close(() => {
    log.warn('Server is now dead - hope this is what you wanted.')
    process.exit()
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
