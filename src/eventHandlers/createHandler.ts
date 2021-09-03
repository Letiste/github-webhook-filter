import { CreateSchema } from "../../types/configuration/create.schema";
import { CreateSchema as CreateBody} from "../../types/webhook/create.schema";

export function filterCreate(body: CreateBody, {refType}: CreateSchema) {
  if (refType.includes(body.ref_type)) {
    return true;
  }
  return false
}
