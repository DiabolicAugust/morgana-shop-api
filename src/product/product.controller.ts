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
import { ProductService } from "./product.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { ErrorsCatchingFilter } from "../services/filters/error-catching.filter.js";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  @UseFilters(new ErrorsCatchingFilter())
  @UsePipes(ValidationPipe)
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }

  @Get("getAll")
  @UseFilters(new ErrorsCatchingFilter())
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get("/:id")
  @UseFilters(new ErrorsCatchingFilter())
  async getProduct(@Param("id") id: string) {
    return this.productService.getProduct(id);
  }

  @Delete("/delete/:id")
  @UseFilters(new ErrorsCatchingFilter())
  async delete(@Param("id") id: string) {
    return this.productService.deleteProduct(id);
  }

  @Patch("/update/:id")
  @UseFilters(new ErrorsCatchingFilter())
  async update(@Body() dto: CreateProductDto, @Param("id") id: string) {
    return this.productService.update(id, dto);
  }
}
