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
  allowedAll?: boolean
  permittedActions?: string[]
  filteredActions?: string[]
  permittedRefType?: string[]
  filteredRefType?: string[]
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
  if (event === undefined) {
    return false;
  }
  if (userBlackListed(body)) {
    return false;
  }
  if (event.allowedAll) {
    return event.allowedAll;
  }
  if (body.ref_type) {
    return refTypeAllowed(event, body.ref_type)
  }
  if (body.action) {
    return actionAllowed(event, body.action);
  }
  return false;
}

function userBlackListed(body: EventBody) {
    return configuration.users_black_listed?.includes(body.sender.login)
}

function actionAllowed(event: EventFilterConfiguration, action: string) {
  if (event.permittedActions && event.permittedActions.includes(action)) {
    return true;
  }
  if (event.filteredActions && !event.filteredActions.includes(action)) {
    return true;
  }
  return false;
}

function refTypeAllowed(event: EventFilterConfiguration, refType: string) {
  if (event.permittedRefType && event.permittedRefType.includes(refType)) {
    return true;
  }
  if (event.filteredRefType && !event.filteredRefType.includes(refType)) {
    return true;
  }
  return false;
}
