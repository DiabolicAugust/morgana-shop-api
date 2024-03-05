import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(ValidationPipe)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("registration")
  @UsePipes(ValidationPipe)
  async registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
