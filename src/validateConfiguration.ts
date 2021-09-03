import Ajv from 'ajv';

import * as filterConfigurationSchema from '../schemas/configuration/filterConfiguration.schema.json';
import * as pullRequestSchema from "../schemas/configuration/pullRequest.schema.json";
import * as configuration from './filterConfiguration.json';

const ajv = new Ajv({schemas: [filterConfigurationSchema, pullRequestSchema]});
const validate = ajv.getSchema("filterConfiguration.schema.json");
if (!validate) {
  throw new Error("Couldn't get filterConfigurationSchema")
}

const valid = validate(configuration);

if (!valid) {
  throw new Error(`Configuration is not valid. Property ${validate.errors![0].instancePath} ${validate.errors![0].message}.`);
}
