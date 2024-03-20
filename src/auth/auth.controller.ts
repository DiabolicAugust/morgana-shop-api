import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/registration.dto";
import { ErrorsCatchingFilter } from "../services/filters/error-catching.filter";

@Controller("auth")
@UseFilters(new ErrorsCatchingFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseFilters(new ErrorsCatchingFilter())
  @UsePipes(ValidationPipe)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("registration")
  @UseFilters(new ErrorsCatchingFilter())
  @UsePipes(ValidationPipe)
  async registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
