# Github Webhooks Filter
> A Github Webhooks filter that lets you select as you want your webhooks events

## Installation

- Clone the repo
- Install the dependencies with `npm install`
- Build the app with `npm run build`
- Run the app with `npm start`. You need to define the environment variable `WEBHOOK_URL`, which is the url to send the filtered webhooks to.
- Add a webhook on your Github repository or organization. The `Payload URL` should be the url where this application run, and the `Content type` should be set as `application/json`. Choose `Send me everything` for the events trigger as this application will filter the events.

And you are done ! Now you can edit the *fully typed* file [filterConfiguration.json](src/filterConfiguration.json), to filter as you would like your webhooks.

## Configuration

### Environment variables

Environment variables available:
- `NODE_ENV`: Node runtime environment. If set to `production`, the logs won't be pretty print.
- `WEBHOOK_URL`: Url to send the filtered webhooks to.
- `PORT`: Port the server listen on. Default to `3000`.
- `HOST`: Domain the server listen on. Default to `127.0.0.1`.
- `BLOCK_UNDEFINED_EVENTS`: If set to `true`, every events not defined in the filter configuration will be blocked. Default to `false`.

### Filter configuration

For each event, you can specify **one** of:
- `allowedAll`: If set to `true`, let through every type of the event.
- `permittedActions` or `permittedRefType`: Array of string of the event's different type not to filter. If an event is not specified in the array, it won't pass.
- `filteredActions` or `filteredRefType`: Array of string of the event's different type to filter. If an event is not specified in the array, it will pass.
- `users_black_listed`: Array of string of users to filter the event from. The user is defined by `sender.login` in the request's payload.

For every event:
- `users_black_listed`: Array of string of users to filter events from. The user is defined by `sender.login` in the request's payload.

You can find all the possible events here: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads

## Development

If you want to test locally, you will need to redirect the webhook sent by Github to your local server. One solution is to use [ngrok](https://ngrok.com/), as explained in the Github's documentation: https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks#exposing-localhost-to-the-internet.

You can also have access to the recent deliveries of a webhook, as explained here: https://docs.github.com/en/developers/webhooks-and-events/webhooks/testing-webhooks.

To generate new events json schema, add them to the file `events/index.ts` and run the command `npm run generate-schemas`.
