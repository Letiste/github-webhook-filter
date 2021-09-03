import { FastifyInstance } from 'fastify';
import { EventBody, handleEvents } from './handleEvents';



export default async function routes(fastify: FastifyInstance) {
  fastify.post<{Body: EventBody}>('*', (request, reply) => {
    const { headers, body } = request;
    const event = headers['x-github-event'] as string;
    if (!event) {
      reply.send(400)
      return
    }
    const {status, message} = handleEvents(event, body, fastify.log);
    reply.code(status).send(message)
  });
}
