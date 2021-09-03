import { RepositoryVulnerabilityAlertSchema } from "../../types/configuration/repositoryVulnerabilityAlert.schema";
import { RepositoryVulnerabilityAlertSchema as RepositoryVulnerabilityAlertBody} from "../../types/webhook/repositoryVulnerabilityAlert.schema";

export function filterRepositoryVulnerabilityAlert(body: RepositoryVulnerabilityAlertBody, {actions}: RepositoryVulnerabilityAlertSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
