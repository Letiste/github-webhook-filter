import { TeamSchema } from "../../types/configuration/team.schema";
import { TeamSchema as TeamBody} from "../../types/webhook/team.schema";

export function filterTeam(body: TeamBody, {actions}: TeamSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
