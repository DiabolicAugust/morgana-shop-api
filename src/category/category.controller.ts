import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AuthGuard } from "../guards/auth-guard";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ErrorsCatchingFilter } from "../services/filters/error-catching.filter";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("create")
  @UseFilters(new ErrorsCatchingFilter())
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Patch("update/:id")
  @UseFilters(new ErrorsCatchingFilter())
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async update(@Body() dto: CreateCategoryDto, @Param("id") id: string) {
    return this.categoryService.update(dto, id);
  }

  @Get("get/:id")
  @UseFilters(new ErrorsCatchingFilter())
  async get(@Param("id") id: string) {
    return this.categoryService.get(id);
  }

  @Get("getAll")
  @UseFilters(new ErrorsCatchingFilter())
  async getAll() {
    return this.categoryService.getAll();
  }
}
