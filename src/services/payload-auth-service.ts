import { HttpException, HttpStatus } from "@nestjs/common";
import { Strings } from "src/data/strings";
import { UserPayload } from "src/user/dto/user-payload";
import { Roles } from "src/user/models/user.model";

export class PayloadAuthService {
  authenticateUserPermission(clientPayload: UserPayload, ownerId: string) {
    if (clientPayload.id != ownerId || clientPayload.role == Roles.Admin) {
      throw new HttpException(
        Strings.userNotAllowedToDoThis,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
