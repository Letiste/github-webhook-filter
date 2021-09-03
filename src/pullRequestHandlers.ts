import { FilterConfigurationSchema as FilterConfigurationInterface } from "../types/configuration/filterConfiguration.schema";
import { PullRequestSchema as PullRequestBody} from "../types/webhook/pullRequest.schema";

function getActionPR(body: PullRequestBody) {
  return body.action
}

function getSenderPR(body: PullRequestBody) {
  return body.sender.login
}

export function filterPR(body: PullRequestBody, prConfiguration: FilterConfigurationInterface) {
  if (prConfiguration.pull_request["users-black-listed"].includes(getSenderPR(body))) {
    return false;
  }
  if (prConfiguration.pull_request.actions.includes(getActionPR(body))) {
    return true;
  }
  return false
}
