import { DeployKeySchema } from "../../types/configuration/deployKey.schema";
import { DeployKeySchema as DeployKeyBody} from "../../types/webhook/deployKey.schema";

export function filterDeployKey(body: DeployKeyBody, {actions}: DeployKeySchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
