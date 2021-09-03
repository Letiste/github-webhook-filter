import { MilestoneSchema } from "../../types/configuration/milestone.schema";
import { MilestoneSchema as MilestoneBody} from "../../types/webhook/milestone.schema";

export function filterMilestone(body: MilestoneBody, {actions}: MilestoneSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
