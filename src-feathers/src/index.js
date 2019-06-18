/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

// Exit on ctrl-c when running in Docker container as PID 1. https://github.com/nodejs/node-v0.x-archive/issues/9131
process.on('SIGTERM', function() {
  console.log('\nCaught SIGTERM, stopping gracefully');
  process.exit(1);
});
