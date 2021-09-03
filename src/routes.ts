import { FastifyInstance } from 'fastify';
import * as BodyWebhookSchema from '../schemas/webhook/bodyWebhook.schema.json';
import { BodyWebhookSchema as BodyWebhookInterface } from '../types/webhook/bodyWebhook.schema';
import { handleEvents } from './handleEvents';

export default async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: BodyWebhookInterface }>('*', { schema: { body: BodyWebhookSchema } }, (request, reply) => {
    const { headers, body } = request;
    const event = headers['x-github-event'] as string;
    if (!event) {
      reply.send(400)
      return
    }
    handleEvents(event, body, headers, fastify.log);
    reply.send();
  });
}
