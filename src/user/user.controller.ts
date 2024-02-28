import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ErrorsCatchingFilter } from "src/services/filters/error-catching.filter";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  @UseFilters(new ErrorsCatchingFilter())
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Delete("delete/:id")
  @UseFilters(new ErrorsCatchingFilter())
  async delete(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch("update/:id")
  @UsePipes(ValidationPipe)
  @UseFilters(new ErrorsCatchingFilter())
  async update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto, id);
  }

  @Get(":id")
  @UseFilters(new ErrorsCatchingFilter())
  async get(@Param("id") id: string) {
    return this.userService.getUser(id);
  }
}
