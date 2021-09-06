import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import { events } from '../../events';

async function generateSchemas() {
  const promises: Promise<void>[] = [];
  for (const [eventName, { type, eventTypes }] of Object.entries(events)) {
    const file = eventTypes ? "./eventSchema.ejs" : "./eventSchemaNoTypeEvent.ejs"
    const promise = new Promise<void>((resolve, reject) => {
      ejs.renderFile(path.join(__dirname, file), { eventName, type: type || 'Action', eventTypes }, (err: Error | null, str: string) => {
        if (err) {
          reject(err);
        }
        resolve(fs.writeFileSync(path.join(__dirname, `../../schemas/${eventName}.schema.json`), str));
      });
    });
    promises.push(promise);
  }
  await Promise.all(promises)
  await new Promise<void>((resolve, reject) => {
    ejs.renderFile(path.join(__dirname, "./filterConfigurationSchema.ejs"), { eventsName: Object.keys(events) }, (err: Error | null, str: string) => {
      if (err) {
        reject(err);
      }
      resolve(fs.writeFileSync(path.join(__dirname, `../../schemas/filter_configuration.schema.json`), str));
    });
  });
}

generateSchemas();
