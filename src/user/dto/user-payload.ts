import { Roles } from "../models/user.model";

export class UserPayload {
  email: string;
  id: string;
  role: Roles;
}
