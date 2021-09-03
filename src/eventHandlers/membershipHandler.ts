import { MembershipSchema } from "../../types/configuration/membership.schema";
import { MembershipSchema as MembershipBody} from "../../types/webhook/membership.schema";

export function filterMembership(body: MembershipBody, {actions}: MembershipSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
