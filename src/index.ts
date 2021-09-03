import fastify from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

const schemas = fs
  .readdirSync(path.join(__dirname, '../schemas/webhook'))
  .map((file) => require(path.join(__dirname, '../schemas/webhook', file)));

const server = fastify({
  logger: { prettyPrint: true },
  ajv: { customOptions: { schemas } },
});

server.register(require('./routes'))

server.listen(4567, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
