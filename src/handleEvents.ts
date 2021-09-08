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
  allowedAll?: boolean;
  permittedActions?: string[];
  filteredActions?: string[];
  permittedRefType?: string[];
  filteredRefType?: string[];
  users_black_listed?: string[];
}

interface TypeEventAllowed {
  type: string;
  permittedTypes: string[] | undefined;
  filteredTypes: string[] | undefined;
  users_black_listed: string[] | undefined;
  body: EventBody;
}

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const BLOCK_UNDEFINED_EVENTS = process.env.BLOCK_UNDEFINED_EVENTS?.toLowerCase() === 'true'

if (!WEBHOOK_URL) {
  throw new Error('Environment Variable "WEBHOOK_URL" is not defined');
}

export function handleEvents(event: string, body: EventBody, logger: FastifyLoggerInstance): { status: number; message: string } {
  if (isAllowed(configuration[event], body)) {
    const headers = { 'Content-Type': 'application/json', 'X-Github-Event': event };
    axios.post(WEBHOOK_URL!, body, { headers }).catch(logger.error);
    return { status: 200, message: 'Event accepted' };
  } else {
    const property =  body.action ? `action "${body.action}"` :
                      body.ref_type ? `ref_type "${body.ref_type}"` :
                      "no property"
    const message = `Event "${event}" with ${property} from sender "${body.sender.login}" has been filtered`;
    logger.info(message);
    return { status: 400, message };
  }
}

function isAllowed(event: EventFilterConfiguration | undefined, body: EventBody) {
  if (!userAllowed(configuration.users_black_listed, body)) {
    return false
  }
  if (!BLOCK_UNDEFINED_EVENTS && !event) {
    return true
  }
  return event !== undefined && eventAllowed(event, body);
}

function userAllowed(users_black_listed: string[] | undefined, body: EventBody) {
  return !users_black_listed?.includes(body.sender.login);
}

function eventAllowed(event: EventFilterConfiguration, body: EventBody) {
  return (event.allowedAll && userAllowed(event.users_black_listed, body)) || 
        (body.action && typeEventAllowed({type: body.action, permittedTypes: event.permittedActions, filteredTypes: event.filteredActions, users_black_listed: event.users_black_listed, body})) || 
        (body.ref_type && typeEventAllowed({type: body.ref_type, permittedTypes: event.permittedRefType, filteredTypes: event.filteredRefType, users_black_listed: event.users_black_listed, body}));
}

function typeEventAllowed({type, permittedTypes, filteredTypes, users_black_listed, body}: TypeEventAllowed) {
  if (permittedTypes && permittedTypes.includes(type) && userAllowed(users_black_listed, body)) {
    return true;
  }
  if (filteredTypes && !filteredTypes.includes(type) && userAllowed(users_black_listed, body)) {
    return true;
  }
  return false;
}
