import { TeamAddSchema } from "../../types/configuration/teamAdd.schema";
import { TeamAddSchema as TeamAddBody} from "../../types/webhook/teamAdd.schema";

export function filterTeamAdd(body: TeamAddBody, {allowed}: TeamAddSchema) {
  return allowed
}
