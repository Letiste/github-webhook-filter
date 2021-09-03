import fastify from 'fastify';

const server = fastify({
  logger: { prettyPrint: process.env.NODE_ENV?.toLowerCase() !== 'production' },
});

server.register(require('./routes'))

server.listen({host: process.env.HOST || "127.0.0.1", port: Number(process.env.PORT) || 4567}, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
