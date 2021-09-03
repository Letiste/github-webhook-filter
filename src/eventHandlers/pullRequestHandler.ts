import { PullRequestSchema } from "../../types/configuration/pullRequest.schema";
import { PullRequestSchema as PullRequestBody} from "../../types/webhook/pullRequest.schema";

export function filterPR(body: PullRequestBody, {actions}: PullRequestSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
