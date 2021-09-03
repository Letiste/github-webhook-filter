import { ReleaseSchema } from "../../types/configuration/release.schema";
import { ReleaseSchema as ReleaseBody} from "../../types/webhook/release.schema";

export function filterRelease(body: ReleaseBody, {actions}: ReleaseSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
