import axios from 'axios';
import { FastifyLoggerInstance } from 'fastify';
import * as configuration from './filterConfiguration.json';

export interface EventBody {
  action?: string;
  ref_type?: string;
  sender: {
    login: string;
  };
}

interface EventFilterConfiguration {
  allowed?: boolean,
  actions?: string[],
  refType?: string[]
}

const webhookUrl = process.env.WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error('Environment Variable "WEBHOOK_URL" is not defined');
}

export function handleEvents(event: string, body: EventBody, logger: FastifyLoggerInstance): {status: number, message: string} {
  if (isAllowed(configuration[event], body)) {
    const headers = { 'Content-Type': 'application/json', 'X-Github-Event': event };
    axios.post(webhookUrl!, body, { headers }).catch(logger.error);
    return {status: 200, message: 'Event accepted'}
  } else {
    const message = `Event "${event}" with property "${body.action || body.ref_type}" from sender "${body.sender.login}" has been filtered`
    logger.warn(message);
    return {status: 400, message}
  }
}

function isAllowed(event: EventFilterConfiguration | undefined, body: EventBody) {
  if (configuration.users_black_listed.includes(body.sender.login)) {
    return false
  }
  if (event === undefined) {
    return false;
  }
  if (configuration.users_black_listed.includes(body.sender.login)) {
    return false;
  }
  if (event.allowed === false) {
    return false;
  }
  if (event.refType !== undefined && body.ref_type !== undefined && !event.refType.includes(body.ref_type)) {
    return false;
  }
  if (event.actions !== undefined && body.action !== undefined && !event.actions.includes(body.action)) {
    return false;
  }
  return true;
}
