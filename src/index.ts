import fastify from 'fastify';
import axios from "axios"
import * as fs from "fs"
import * as path from "path"
import { filterPR } from './pullRequestHandlers';
import * as configuration from './filterConfiguration.json';
import * as BodyWebhookSchema from "../schemas/webhook/bodyWebhook.schema.json"
import { BodyWebhookSchema as BodyWebhookInterface } from "../types/webhook/bodyWebhook.schema";
import { FilterConfigurationSchema as FilterConfigurationInterface } from "../types/configuration/filterConfiguration.schema";

const schemas = fs.readdirSync(path.join(__dirname, "../schemas/webhook")).map(file => require(path.join(__dirname, "../schemas/webhook", file)))

const server = fastify({ 
  logger: { prettyPrint: true },
  ajv: {customOptions: {schemas}}
});

const filterConfiguration = configuration as FilterConfigurationInterface
const webhookUrl = 'https://discord.com/api/webhooks/883302370291908618/tY4FM8y4w09BvWBy19emSX56qv9HGV6jELDsN3I-_1ZlHXH9nCEZKiKnaZIvkGUtv-Z2/github'

server.post<{ Body: BodyWebhookInterface }>('*', { schema: { body: BodyWebhookSchema } }, async (request, reply) => {
  const { headers, body } = request;
  const event = headers['x-github-event'];
  let valid = false
  switch (event) {
    case 'pull_request':
      valid = filterPR(body, filterConfiguration);
      break;
  }
  if (valid) {
    const githubHeaders = Object.keys(headers).filter(key => key.startsWith('x-github-')).reduce((newHeaders, key) => {
      newHeaders[key] = headers[key] as string
      return newHeaders
    }, {} as Record<string, string>)
    axios.post(webhookUrl, body, {headers: {'Content-Type': 'application/json', ...githubHeaders}})
    .catch(server.log.error)
  }
  reply.send();
});

server.listen(4567, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
