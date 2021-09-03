import { RepositorySchema } from "../../types/configuration/repository.schema";
import { RepositorySchema as RepositoryBody} from "../../types/webhook/repository.schema";

export function filterRepository(body: RepositoryBody, {actions}: RepositorySchema) {
  if (actions.includes(body.action)) {
    return true;
  }
  return false
}
