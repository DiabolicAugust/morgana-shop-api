import { Injectable } from "@nestjs/common";
import { JwtService as Jwt } from "@nestjs/jwt";
import { UserPayload } from "src/user/dto/user-payload";

@Injectable()
export class JwtService {
  constructor(private jwtService: Jwt) {}

  signToken(payload: UserPayload): string {
    return this.jwtService.sign(payload);
  }

  getPayloadFromToken(token: string): any {
    return this.jwtService.verify(token, { secret: process.env.SECRET });
  }
}
