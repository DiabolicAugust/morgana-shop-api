import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "src/services/jwt-service";
import { UserPayload } from "src/user/dto/user-payload";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization.split(" ")[1];

      const payload: UserPayload = this.jwtService.getPayloadFromToken(token);
      req.payload = payload;
      console.log(payload);
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
