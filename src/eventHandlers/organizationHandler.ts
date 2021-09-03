import { OrganizationSchema } from "../../types/configuration/organization.schema";
import { OrganizationSchema as OrganizationBody} from "../../types/webhook/organization.schema";

export function filterOrganization(body: OrganizationBody, {actions}: OrganizationSchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
