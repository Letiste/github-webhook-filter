import { IssueSchema } from "../../types/configuration/issue.schema";
import { IssueSchema as IssueBody} from "../../types/webhook/issue.schema";

export function filterIssue(body: IssueBody, {actions}: IssueSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
