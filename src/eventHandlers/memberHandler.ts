import { MemberSchema } from "../../types/configuration/member.schema";
import { MemberSchema as MemberBody} from "../../types/webhook/member.schema";

export function filterMember(body: MemberBody, {actions}: MemberSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
