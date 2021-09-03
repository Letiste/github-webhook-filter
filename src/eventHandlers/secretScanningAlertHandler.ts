import { SecretScanningAlertSchema } from "../../types/configuration/secretScanningAlert.schema";
import { SecretScanningAlertSchema as SecretScanningAlertBody} from "../../types/webhook/secretScanningAlert.schema";

export function filterSecretScanningAlert(body: SecretScanningAlertBody, {actions}: SecretScanningAlertSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
