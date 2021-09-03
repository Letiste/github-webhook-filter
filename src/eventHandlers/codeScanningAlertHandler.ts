import { CodeScanningAlertSchema } from "../../types/configuration/codeScanningAlert.schema";
import { CodeScanningAlertSchema as CodeScanningAlertBody} from "../../types/webhook/codeScanningAlert.schema";

export function filterCodeScanningAlert(body: CodeScanningAlertBody, {actions}: CodeScanningAlertSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
