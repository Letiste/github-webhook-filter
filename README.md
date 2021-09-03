# Github Webhooks Filter
> A Github Webhooks filter that lets you select as you want your webhooks events

## Installation

- Clone the repo
- Install the dependencies with `npm install`
- Build the app with `npm run build`
- Run the app with `npm start`. You need to define the environment variable `WEBHOOK_URL`, which is the url to send the filtered webhooks to.
- Add a webhook on your Github repository or organization. The `Payload URL` should be the url where this application run, and the `Content type` should be set as `application/json`. Choose `Send me everything` for the events trigger as this application will filter the events.

And you are done ! Now you can edit the *fully typed* file [filterConfiguration.json](src/filterConfiguration.json), to filter as you would like your webhooks.
